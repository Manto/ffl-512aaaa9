import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface TrainingContext {
  moduleId: string;
  moduleName: string;
  equipment: string;
  permitNumber: string;
  currentPhase: string;
  teamMembers: string[];
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, context } = await req.json() as { 
      messages: { role: string; content: string }[];
      context: TrainingContext;
    };

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const systemPrompt = `You are an AI training coach helping a learner through an industrial safety simulation.

SCENARIO CONTEXT:
- Training Module: ${context.moduleName}
- Equipment: ${context.equipment}
- Permit Number: ${context.permitNumber}
- Current Simulation Phase: ${context.currentPhase}
- Team Members: ${context.teamMembers.join(", ")}

YOUR ROLE:
You are a supportive training coach. Help the learner understand:
- Safety procedures and why they matter
- Equipment details and permit requirements
- Team member roles and responsibilities
- Best practices for industrial maintenance work

IMPORTANT GUIDELINES:
1. Be encouraging and supportive - this is a learning environment
2. Keep answers concise and focused (2-4 sentences typically)
3. DO NOT give away simulation answers directly - guide the learner to think through problems
4. Emphasize safety principles and the "why" behind procedures
5. If asked about specific decision points, explain the reasoning without spoiling the answer
6. Use clear, professional language appropriate for industrial training

When the learner asks about the bleeder valve vs blind flange decision, explain WHY venting first is important (trapped pressure, zero energy verification) without directly saying which choice to make.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limits exceeded, please try again later." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Payment required, please add credits to your workspace." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(
        JSON.stringify({ error: "AI gateway error" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Training coach error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

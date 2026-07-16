export const CONTRACT_PROMPT = (contractType, formData) => `You are a senior legal drafting AI. Generate a complete, formal ${contractType} contract using the following party and agreement details:
${JSON.stringify(formData, null, 2)}

Requirements:
- Use formal legal language throughout
- Number all clauses using format: 1., 1.1, 1.2, 2., 2.1, etc.
- Bold all major section headings using ALL CAPS
- Include all standard boilerplate clauses for a ${contractType}
- Include a signature block at the end with placeholder lines for both parties
- Output ONLY the contract text
- No explanations, no disclaimers, no markdown code fences
- Minimum 800 words
- Include date placeholder as [DATE] and location as [CITY, STATE]`;

export const RISK_PROMPT = (contractText) => `You are a legal risk analyst. Analyze the following contract for legal risks, imbalances, and problematic clauses.
Return ONLY a valid JSON object in exactly this format with no extra text:
{
  "riskScore": "Low" or "Medium" or "High",
  "riskyClauses": [
    {
      "clause": "short excerpt of the problematic clause",
      "risk": "explanation of why this is risky",
      "severity": "Low" or "Medium" or "High"
    }
  ],
  "suggestions": [
    {
      "original": "original clause text",
      "improved": "safer rewritten version"
    }
  ],
  "summary": "2-3 sentence overall risk summary"
}

Contract to analyze:
${contractText}`;

export const SUMMARY_PROMPT = (contractText) => `Explain the following contract in plain English for someone with no legal background.
Structure your response as:
**What this contract is about:** (1 sentence)
**What Party A must do:** (bullet points)
**What Party B must do:** (bullet points)
**Financial commitments:** (bullet points)
**How this contract can be ended:** (bullet points)
**Key risks to watch out for:** (bullet points)

Use simple everyday language. No legal jargon. Maximum 400 words.

Contract:
${contractText}`;

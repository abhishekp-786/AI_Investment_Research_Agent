import { NextRequest, NextResponse } from "next/server";
import { investmentAgent } from "@/langchain/agents/investment";
import { createSuccessResponse, createErrorResponse } from "@/utils/helpers";
import { researchRequestSchema } from "@/lib/validation/schema";
import { handleError } from "@/utils/errors";

/**
 * POST /api/research
 * Generate investment research and recommendation for a company
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json();

    // Validate input
    const validationResult = researchRequestSchema.safeParse(body);
    if (!validationResult.success) {
      const message = validationResult.error.errors[0]?.message || "Invalid request";
      return NextResponse.json(createErrorResponse(message), { status: 400 });
    }

    const { company } = validationResult.data;

    // eslint-disable-next-line no-console
    console.log(`[API] Researching company: ${company}`);

    // Generate recommendation
    const recommendation = await investmentAgent.analyzeCompany(company);

    // eslint-disable-next-line no-console
    console.log(
      `[API] Research complete for ${company} - Recommendation: ${recommendation.recommendation}`,
    );

    return NextResponse.json(
      createSuccessResponse(recommendation, "Research completed successfully"),
      { status: 200 },
    );
  } catch (error) {
    const { message, statusCode } = handleError(error);
    console.error("[API] Research error:", error);
    return NextResponse.json(createErrorResponse(message), { status: statusCode });
  }
}

/**
 * GET /api/research
 * Not supported - use POST instead
 */
export async function GET(): Promise<NextResponse> {
  return NextResponse.json(
    createErrorResponse("POST method required for research endpoint"),
    { status: 405 },
  );
}

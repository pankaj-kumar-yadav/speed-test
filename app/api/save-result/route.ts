import { type NextRequest, NextResponse } from "next/server"
import { promises as fs } from "fs"
import path from "path"

export async function POST(request: NextRequest) {
    try {
        const result = await request.json()

        // Create public/results directory if it doesn't exist
        const resultsDir = path.join(process.cwd(), "public", "results")

        try {
            await fs.mkdir(resultsDir, { recursive: true })
        } catch (err) {
            // Directory might already exist
        }

        // Generate filename with timestamp
        const timestamp = new Date().getTime()
        const filename = `result-${timestamp}.json`
        const filepath = path.join(resultsDir, filename)

        // Write result to file
        await fs.writeFile(filepath, JSON.stringify(result, null, 2), "utf-8")

        // Also maintain a results.json that contains all results
        const allResultsPath = path.join(resultsDir, "all-results.json")
        let allResults: any[] = []

        try {
            const existingData = await fs.readFile(allResultsPath, "utf-8")
            allResults = JSON.parse(existingData)
        } catch (err) {
            // File doesn't exist yet, start fresh
            allResults = []
        }

        allResults.push({
            ...result,
            id: timestamp,
            filename,
        })

        // Keep only last 100 results to avoid file getting too large
        if (allResults.length > 100) {
            allResults = allResults.slice(-100)
        }

        await fs.writeFile(allResultsPath, JSON.stringify(allResults, null, 2), "utf-8")

        return NextResponse.json({
            success: true,
            message: "Result saved successfully",
            filename,
            id: timestamp,
        })
    } catch (error) {
        console.error("Error saving result:", error)
        return NextResponse.json({ success: false, error: "Failed to save result" }, { status: 500 })
    }
}

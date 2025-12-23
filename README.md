# ReadSpeed - English Reading Speed Test

A Next.js application for measuring English reading speed and comprehension with scientifically designed passages and metrics.

## Features

- **Interactive Reading Test**: Timed passages with 5 multiple-choice comprehension questions
- **Accurate WPM Calculation**: Formula: `WPM = (Words ÷ Time in Minutes) × Accuracy Rate`
- **Random Passage Selection**: Multiple curated passages from Aeon essays, randomly selected for each test
- **Detailed Results**: Displays WPM, accuracy percentage, correct answers, and time taken
- **Data Persistence**: Results automatically saved as JSON files in `/public/results/`
- **Educational Tooltips**: Explains reading speed metrics and calculation methodology
- **Nova Design System**: Clean, professional UI built with Shadcn UI and Tailwind CSS

## Project Structure

```
├── app/
│   ├── page.tsx              # Home page with features
│   ├── layout.tsx            # Root layout
│   ├── globals.css           # Design tokens & styles
│   ├── test/page.tsx         # Reading test page
│   ├── about/page.tsx        # About page with formula explanation
│   └── api/
│       └── save-result/      # API endpoint for saving test results
├── components/
│   ├── reading-test.tsx      # Main test component
│   ├── test-results.tsx      # Results display component
│   └── ui/                   # Shadcn UI components
└── public/
    ├── passages.json         # Curated passages & questions
    └── results/              # Saved test results (JSON)
```

## Getting Started

```bash
npm install
npm run dev
```

Visit `http://localhost:3000` to start testing.

## How It Works

1. **Home Page**: Overview of the test with feature highlights
2. **Test Page**: Read a randomly selected passage, answer questions within the time limit
3. **Results**: Get your WPM score, accuracy, and performance breakdown
4. **Data**: Results saved to `/public/results/` with unique timestamps

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **UI**: Shadcn UI + Tailwind CSS v4
- **Database**: JSON files in public directory (accessible via HTTP)
- **Icons**: Lucide React
- **Analytics**: Vercel Analytics

## Calculation Formula

$$\text{WPM} = \frac{\text{Total Words}}{\text{Time in Minutes}} \times \text{Accuracy Rate}$$

Accuracy is calculated as the percentage of correct answers out of 5 questions, ensuring both speed and comprehension are rewarded.

## License

MIT

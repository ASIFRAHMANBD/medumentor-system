type Params = { stageSlug: string; subjectSlug: string; moduleSlug: string; chapterSlug: string };

export default async function ChapterPage({ params }: { params: Params }) {
  return (
    <main style={{ padding: 24 }}>
      <h1>Chapter {params.chapterSlug}</h1>
      <p>Contents will appear here.</p>
    </main>
  );
}
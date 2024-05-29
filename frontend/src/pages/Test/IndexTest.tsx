import BlogIndex from "./BlogIndex";
import DetailIndex from "./DetailIndex";



export default function IndexTest() {
  return (
    <div className="flex p-20">
      <article className="prose lg:prose-xl">
        <h3>Test Archives</h3>
        <BlogIndex/>
        <h3>Test Details</h3>
        <DetailIndex/>
      </article>
    </div>
  );
}

import BlogIndex from "./BlogIndex";
import DetailIndex from "./DetailIndex";
import PersonnelIndex from "./PersonnelIndex";



export default function IndexTest() {
  return (
    <div className="flex p-20">
      <article className="prose lg:prose-xl">
        <h3>Test Archives</h3>
        <BlogIndex/>
        <h3>Test Details</h3>
        <DetailIndex/>
        <h3>Test Personnels</h3>
        <PersonnelIndex/>
      </article>
    </div>
  );
}

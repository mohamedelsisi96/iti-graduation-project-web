import Link from "next/link";
const Breadcrumb = ({ pageName }) => {
  return (
    <div className=" flex flex-row gap-3 items-center justify-between">
      <h2 className="text-title-md2 font-semibold text-black dark:text-white">
        {pageName}
      </h2>
      <nav>
        <ol className="flex items-center gap-2">
          <li>
            <Link className="font-medium" href="/admin/home">
              Dashboard /
            </Link>
          </li>
          <li className="font-medium text-primary">{pageName}</li>
        </ol>
      </nav>
    </div>
  );
};
export default Breadcrumb;

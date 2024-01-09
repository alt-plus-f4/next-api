import Link from "next/link";

const Page = () => {
    return ( 
    <>
        <h1 className='self-center absolute my-12 font-bold text-5xl'>Create Item/Case</h1>

        <div className="item-case">
            <Link href='/create/case'>ITEM</Link>
            <Link href='/create/case'>CASE</Link>
        </div>
    </>);
}
 
export default Page;
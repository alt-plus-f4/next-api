
interface PageProps {
  params: {
    slug: string
  }
}

const page = async ({params} : PageProps) => {
    const { slug } = params;

    return (
        <div>
            <h1>Page for case: {slug}</h1>
        </div>
    );
};

export default page;

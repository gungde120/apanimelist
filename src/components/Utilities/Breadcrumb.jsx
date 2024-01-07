import Link from 'next/link';

const Breadcrumb = ({ paths }) => {
    return (
        <nav aria-label="Breadcrumb">
            <ol className="breadcrumb flex space-x-2">
            {paths.map((path, index) => (
                <li key={index} className="breadcrumb-item">
                {index === paths.length - 1 ? (
                    <span className="text-color-sky-500">{path.name}</span>
                ) : (
                    <>
                    <Link className='hover:text-color-sky-500' href={path.url}>
                        {path.name}
                    </Link>
                    <span className="mx-1">&gt;</span>
                    </>
                )}
                </li>
            ))}
            </ol>
        </nav>
        );
    };
    

export default Breadcrumb;
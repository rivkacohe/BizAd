import './Title.css';

interface Props {
    text: string;
    children: React.ReactNode;
}

function Title(props: Props) {
    return (
        <div className="title text-center p-3">
            <h1 >
                {props.text}
            </h1>
            <h3 className='subTitle'>
            {props.children}
            </h3>
        </div>

    );
}

export default Title;
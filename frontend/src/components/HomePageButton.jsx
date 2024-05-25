import { useNavigate } from 'react-router-dom';

export default function HomePageButton({name,linkTo}) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(linkTo);
    };

    return (
        <button className="border border-slate-600 shadow-xl p-20 rounded-md font-semibold h-[100%]  hover:text-xl ease-in duration-200" onClick={handleClick}>
            {name}
        </button>
    );
}

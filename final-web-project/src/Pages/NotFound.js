import { useNavigate } from "react-router";
import { RiEmotionSadLine } from "react-icons/ri";

//Pagina de NotFound
const NotFound = () => {

    const navigate = useNavigate();

    const onClickNavigate = (e) => {
        navigate('/');
    }

    return (
        <div className="w-full h-screen flex flex-col justify-center items-center bg-gray-500 space-y-6 text-xl text-gray-200">
            <h1 className="font-semibold text-2xl"> Error 404 </h1>
            <h2 > La página no existe </h2>
            <RiEmotionSadLine size="80" />
            <button className=" bg-theRevenant-darkBlue p-4 rounded-lg hover:bg-theRevenant-blueGreen " 
            onClick={(e) => onClickNavigate(e)}> Regresar al login </button>
        </div>
    );
}

export default NotFound;
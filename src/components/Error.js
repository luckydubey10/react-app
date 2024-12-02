import { useRouteError } from "react-router-dom";

const ErrorComponent = () =>{
    const error = useRouteError();
     console.log('error>>>', error);
    return (
        <div>
            <h1>Oppss!!</h1>
            <p>Something went wrong.</p>
            <h3>{error.status}: {error.statusText}</h3>
            <p>{error.data}</p>
        </div>
    )
}

export default ErrorComponent;
const Loading = ({msg = "Ładowanie..."}) => {
    return (
        <div className="form-container text-xl text-first items-center text-center my-10">{msg}</div>
    );
}

export default Loading;
const PostForm = () =>{
    
    return(
        <div className="w-3/4 min-h-screen bg-gray-100 border rounded-t-lg shadow-lg">
            <main>
                <form onSubmit={()=>console.log("A")} 
                className="flex-col p-10">
                    <h3>Titulo:</h3>
                    <input name="title" placeholder="E.j COMO DESCARGAR OFFICE 2020 + ACTIVADO DE POR VIDA - [ULTIMA VERSION] | FULL EN ESPAÑOL Y GRATIS" 
                    className="w-5/6 border-2 border-black rounded"/>
                    <h3>Descripcion:</h3>
                    <input name="description" placeholder="DESCRIPCION" 
                    className="w-5/6 border-2 border-black rounded"></input>
                    <h3>Imagen(url):</h3>
                    <input name="picture" placeholder="ENLACE"
                    className="w-5/6 border-2 border-black rounded"></input>
                </form>
            </main>
        </div>
    );
}
export default PostForm;
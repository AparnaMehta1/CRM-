import { useNavigate } from "react-router-dom"
// import not from '../assets/403.svg'

const Unauthorized = () => {
    const navigate = useNavigate();

    const goBack = () => navigate(-1);

    return (
        <section className="bg-light vh-100 d-flex justify-content-center align-items-center text-center">
         <div>
            <h1>Unauthorized Access</h1>
<img src={'https://th.bing.com/th/id/R.135c1f356579b8fe8ce586137917fcd8?rik=9Tb6z9HIHqXuQQ&riu=http%3a%2f%2fcdn3.wpbeginner.com%2fwp-content%2fuploads%2f2016%2f03%2f403forbiddenerror.jpg&ehk=wtxYb2ZEv9wgtZhEeu%2b94GPD%2fL03vfmbYq2d01BCHvo%3d&risl=&pid=ImgRaw&r=0'} alt=""/>
            <br />
            <p>You do not have access to the requested page.</p>
            <div className="flex-row">
                <button className="btn btn-primary" onClick={goBack}>Go Back</button>
            </div>
            </div>
        </section>
       
    )
}

export default Unauthorized
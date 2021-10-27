import './App.css';
import img from './assests/personImage.jpg'
import { SignUp } from './components/SignUp'

function App() {
  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-md-5">
          <SignUp />
        </div>
        <div className="col-md-7">
          <img className="img-fluid vector-img w-100" src={img} alt="" />
        </div>
      </div>
    </div>
  );
}

export default App;

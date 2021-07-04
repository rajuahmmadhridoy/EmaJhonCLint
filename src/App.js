
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Shop from './Component/Shop/Shop'
import Header from './Component/Header/Header'
import Product from './Component/Product/Product';

function App() {
  return (
    <div className="appCss">
      <Header />
      <Shop />
      <Product />
    </div>
  );
}

export default App;

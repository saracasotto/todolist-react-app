import Footer from './components/Footer.jsx';
import Header from './components/Header.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import TaskList from './components/TaskList.jsx';

function App() {
  return (
    <div className="App">
      <Header />
      <TaskList />
      <Footer />
    </div> 
  );
}

export default App;

import './App.css';
import ReleaseAutomation from './components/ReleaseAutomation';

function App() {
  return (
<div className="container mb-5">
      <h1 className="mt-3 text-center" style={{ color: "blue" }}>
        Enterprise Subscription Services
      </h1>
      <p className="text-center">Group ID: 12345685</p>
      <div className="mt-5">
        <ReleaseAutomation />
      </div>
    </div>
  );
}

export default App;

import { useEffect } from 'react';

const BTP = () => {
  useEffect(() => {
    // Redirect to the static HTML file
    window.location.href = '/btp.html';
  }, []);

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <p>Redirection en cours...</p>
    </div>
  );
};

export default BTP;

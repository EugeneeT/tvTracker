// Footer.jsx

// Styles for header, main, and footer sections
const footStyle = {
    position: 'fixed',
    bottom: 0,
    left: 0,
    width: '100%',
    height: '10%',
    background: '#333', // Set background color to a dark color for visibility
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    color: 'white',
};


function Footer() {

    return (
        <div style={footStyle}>Created by Eugenee</div>
    )
}

export default Footer;
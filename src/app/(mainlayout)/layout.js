import Footer from '@/components/share/Footer';
import Navbar from '@/components/share/Navbar';
import React from 'react';

const layout = ({children}) => {
    return (
        <div>
            <Navbar/>
            {children}
            <Footer/>
        </div>
    );
};

export default layout;
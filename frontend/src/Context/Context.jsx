import React, { createContext, useState } from 'react';
export const DataContext = createContext();

function Context({ children }) {
    const [state, setstate] = useState([]);
    const [isLoaged, setisLoaged] = useState(false);
    const [adminTrue, setadminTrue] = useState(true);

    const [contact, setcontact] = useState([]);
    const [user, setuser] = useState();

    const [seller, setseller] = useState();
    const [sellerTrue, setsellerTrue] = useState(true);
    const [cartCount, setcartCount] = useState([]);

    return (
        <DataContext.Provider
            value={{
                Users: [user, setuser],
                Sellers: [seller, setseller],
                State: [state, setstate],
                sellerTrue: [sellerTrue, setsellerTrue],
                AdminTrue: [adminTrue, setadminTrue],
                Cartcount: [cartCount, setcartCount],
                IsLoaged: [isLoaged, setisLoaged],
                setseller,
                seller,
            }}
        >
            {children}
        </DataContext.Provider>
    );
}

export default Context;

import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { jwtDecode } from "jwt-decode";


function PrivateRoute({ children, allowedRoles }) {
    //const token = useSelector(store => store.login);

    const token = localStorage.getItem("token");

    if (!token) {
        // Token yoksa giriş yapmamış → login sayfasına yolla
        console.log("token yok hoca")
        return <Navigate to="/yetkisiz-erisim" replace />;
    }

    try {
        // Token var → jwt-decode ile decode et
        const decoded = jwtDecode(token);

        // Role al
        const role = decoded.role || decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

        // Rol uygun mu?
        if (allowedRoles.includes(role)) {
            return children;
        } else {
            // Rol uygun değil → yetkisiz sayfa mesela veya anasayfa
            return <Navigate to="/yetkisiz-erisim" replace />;
        }
    } catch (error) {
        console.error("Token çözümleme hatası:", error);
        return <Navigate to="/yetkisiz-erisim" replace />;
    }
}

export default PrivateRoute;

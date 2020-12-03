import React from 'react'
import { LoginRegisterHeaderContainer, Button, ContentTextDefault, ContentTextActive, ButtonActive } from './style'

export const LoginRegisterHeader = ({ tabs, changeTab, activeTab }) => {
    const LoginButton = activeTab === tabs[0].menuItem ? ButtonActive : Button;
    const RegisterButton = activeTab === tabs[1].menuItem ? ButtonActive : Button;
    const LoginButtonText = activeTab === tabs[0].menuItem ? ContentTextActive : ContentTextDefault;
    const RegisterButtonText = activeTab === tabs[1].menuItem ? ContentTextActive : ContentTextDefault;
    return (
        <>
        <LoginRegisterHeaderContainer>
            <LoginButton onClick={() => changeTab(tabs[0].menuItem)}>
                <LoginButtonText>{tabs[0].menuItem}</LoginButtonText>
            </LoginButton>
            <RegisterButton onClick={() => changeTab(tabs[1].menuItem)}>
                <RegisterButtonText>{tabs[1].menuItem}</RegisterButtonText>
            </RegisterButton>
        </LoginRegisterHeaderContainer>
        </>
    )
}
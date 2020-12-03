import {Loader} from "semantic-ui-react";
import {BlueButton} from "../../components/common/styles";
import React from "react";

export default function BlueButtonLoading ({ isLoading, children, onClick, size, color }) {
    return (
        <BlueButton color={color} size={size} disabled={isLoading} onClick={() => onClick()}>
            {
                isLoading ? (
                    <Loader size="small" active inline='centered' />
                ) : (
                    children
                )
            }
        </BlueButton>
    )
}
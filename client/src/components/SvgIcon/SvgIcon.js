import React  from 'react'
import {Icon, ActiveIcon, IconDot} from './style'

export const SvgIcon = ({ svgContent, active, dotted = false }) => {
    return (
        <span style={{ position: 'relative' }}>
            {active ? (
                <ActiveIcon>{svgContent}</ActiveIcon>
            ) : (
                <Icon>{svgContent}</Icon>
            )}
            {dotted && <div style={IconDot} />}
        </span>
    )
}
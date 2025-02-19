export const ModalColor = ({onMouseOut , ref, x, y, className, children}) => {

    return(
        <div 
            ref={ref}
            className={className} 
            onMouseOut={onMouseOut}
            style={
                {
                    background: "#e0e0e0", 
                    top: y, 
                    left: x,
                    display: "flex", 
                    flexDirection: "column", 
                    alignItems: "center"
                }
            }
            
        >
            {children}
        </div>
    )
}
type Position = 'absolute' | 'relative' | 'static' | 'fixed' | undefined;
type TextAlign = 'left' | 'right' | 'center' | 'justify' | 'initial' | 'inherit' | undefined;

export const styles = {
    chatWithMeButton: {
        cursor: 'pointer',
        boxShadow: '0px 0px 16px 6px rgba(0, 0, 0, 0.33)',
        // Border
        borderRadius: '50%',
        // Background 
        backgroundImage: `url(https://firebasestorage.googleapis.com/v0/b/hotelroom-405612.appspot.com/o/profileImages%2F657bf72dad6684ab32db5b38%2Ffaizu.jpeg?alt=media&token=eba35d9f-b37a-4c4f-99a5-722c867c3704)`, 
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: '84px',
        // Size
        width: '84px',
        height: '84px',
        
    },
    avatarHello: { 
        // Position
        position: 'absolute' as Position, 
        left: 'calc(-100% - 44px - 28px)', 
        top: 'calc(50% - 24px)', 
        // Layering
        zIndex: '10000',
        boxShadow: '0px 0px 16px 6px rgba(0, 0, 0, 0.33)',
        // Border
        padding: '12px 12px 12px 16px',
        borderRadius: '24px', 
        // Color
        backgroundColor: '#f9f0ff',
        color: 'black',
        
    },
    supportWindow: {
        // Position
        position: 'fixed' as Position,
        bottom: '116px',
        right: '24px',
        // Size
        width: '300px',
        height: '400px',
        maxWidth: 'calc(100% - 48px)',
        maxHeight: 'calc(100% - 48px)',
        backgroundColor: 'white',
        color:'black',
        // Border
        borderRadius: '12px',
        border: `2px solid #7a39e0`,
        overflow: 'hidden',
        // Shadow
        boxShadow: '0px 0px 16px 6px rgba(0, 0, 0, 0.33)',
    },
    emailFormWindow: { 
        width: '100%',  
        overflow: 'hidden',
        transition: "all 0.5s ease",
        WebkitTransition: "all 0.5s ease",
        MozTransition: "all 0.5s ease",
    },
    stripe: {
        position: 'relative' as Position,
        top: '-45px',
        width: '100%',
        height: '308px',
        backgroundColor: 'rgb(8 51 68 / var(--tw-bg-opacity))' ,
        // '#7a39e0'
        transform: 'skewY(-12deg)',
    },
    topText: { 
        position: 'relative' as Position,
        width: '100%', 
        top: '15%', 
        color: 'white', 
        fontSize: '24px', 
        fontWeight: '600',
    },
    emailInput: { 
        width: '66%',
        textAlign: 'center' as TextAlign,
        outline: 'none',
        padding: '12px',
        borderRadius: '12px',
        border: '2px solid #7a39e0',
        color:'black'
    },
    bottomText: { 
        position: 'absolute' as Position, 
        width: '100%', 
        top: '75%', 
        color: '#7a39e0', 
        fontSize: '24px', 
        fontWeight: '600' 
    },
    loadingDiv: { 
        position: 'absolute' as Position, 
        height: '100%', 
        width: '100%', 
        textAlign: 'center' as TextAlign, 
        backgroundColor: 'white',
    },
    loadingIcon: { 
        color: '#7a39e0', 
        position: 'absolute' as Position, 
        top: 'calc(50% - 51px)', 
        left: 'calc(50% - 51px)',  
        fontWeight: '600',
    },
    chatEngineWindow: {
        width: '100%',  
        backgroundColor: '#fff',
    },
    avatarHovered: {
        transition: 'all 0.33s ease',
        WebkitTransition: 'all 0.33s ease',
        MozTransition: 'all 0.33s ease',
      },
   
}
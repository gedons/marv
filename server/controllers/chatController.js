const respondToMessage = (message) => {
    
    const trimmedMessage = message.toLowerCase().trim();   

    // Add more specific cases or logic as needed
    // ...

    switch (message.toLowerCase().trim()) {
        case "hi":
            case "hello":
              return `To Begin Select an option below:\n1. Contract\n2. Supervision`;   

            case "1":
              return `You have selected the contract option.
              Select an option: \n3.Contract Upstairs \n4.Contract Downstairs`;           
            case "2":          
              return `You have selected the supervision option.
              Select an option: \n5.Supervision Upstairs \n6.Supervision Downstairs`;  
              
            //contract mode
            case "3":
              return `You have selected the contract upstairs option.
              Select an option: \n 7.Contract mode`;           
            case "4":
              return `You have selected the contract downstairs option.
              Select an option: \n 7.Contract mode`;                   
            case "7":
                return `Now select the payment type: \nHalf \nFull`;
            case "half":
                return `voicenote`;
            case "full":
                return `voicenote`;
            case "yes":
                return `You will be forwarded to a customer care`;
            case "no":
                return `Thank you for using our service`;
            
 
            //supervision mode
            case "5":
                return `You have selected the supervision upstairs option.
                    8.Location`;
            case "6":
                return `You have selected the supervision downstairs option.
                    8.Location`;
            case "8":
                return `Now select the service type.              
                  9. Half \n10. Full`;
            case "half":
                return `voicenote`;
            case "full":
                return `voicenote`; 
            case "yes":
                return `You will be forwarded to a customer care`;
            case "no":
                return `Thank you for using our service`;
                

            default:
              return "Sorry I did not understand that.";
    }
  };
  
  const handleMessage = (req, res) => {
    const { message } = req.body;
    const response = respondToMessage(message);
    res.json({ message: response });
  };
  
  module.exports = {
    handleMessage,
  };
  
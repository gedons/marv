const respondToMessage = (message) => {
    
    const trimmedMessage = message.toLowerCase().trim();   

    // Add more specific cases or logic as needed
    // ...

    switch (message.toLowerCase().trim()) {
        case "hi":
            case "hello":
              return `To Begin Select an option below:\n1. Contract\n2. Supervision`;            
            case "contract":

            //options
              return `You have selected the contract option.
              Select an option: \n1.Contract Upstairs \n2.Contract Downstairs`;           
            case "supervision":          
              return `You have selected the supervision option.
              Select an option: \n1.Supervision Upstairs \n2.Supervision Downstairs`;  
              
            //contract mode
            case "contract upstairs":
              return `You have selected the contract upstairs option.
              Select an option: \n 1.Contract mode`;           
            case "contract downstairs":
              return `You have selected the contract downstairs option.
              Select an option: \n 1.Contract mode`;                   
            case "contract mode":
                return `Now select the payment type: \n1.Half \n2.Full`;
            case "half":
                return `voicenote`;
            case "full":
                return `voicenote`;
            case "yes":
                return `You will be forwarded to a customer care`;
            case "no":
                return `Thank you for using our service`;
            
 
            //supervision mode
            case "supervision upstairs":
                return `You have selected the supervision upstairs option.
                    Select an option:\n1.Location`;
            case "supervision downstairs":
                return `You have selected the supervision downstairs option.
                    Select an option:\n1.Location`;
            case "location":
                return `You have selected the location option.
                Select an option:\n1.Half service \n2.Full service`;
            case "half service":
                return `voicenote`;
            case "full service":
                return `voicenote`; 
            case "yes":
                return `You will be forwarded to a customer care`;
            case "no":
                return `Thank you for using our service`;
                

            default:
              return "I did not understand that (Begin a session with Hi or Hello).";
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
  
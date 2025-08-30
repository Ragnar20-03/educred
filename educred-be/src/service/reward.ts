// awardCoins.ts 

export const calculateCoins = (category: string, position: string) => {

    let coins = 0;

    switch (category) {
        case "hackathon":
            if (position === "winner") coins = 1000;
            else if (position === "runner-up") coins = 750;
            else if (position === "third") coins = 500;
            else coins = 200;
            break;

        case "seminar":
            coins = 200;
            break;

        case "internship":
            coins = 1000;
            break;

        case "competition":
            if (position === "winner") coins = 500;
            else if (position === "runner-up") coins = 300;
            else if (position === "third") coins = 200;
            else coins = 100;
            break;

        case "certification-course":
            coins = 200;
            break;

        case "paper-presentation":
            coins = 1000;
            break;

        case "event-volunteering":
            coins = 100;
            break;

        case "open-source":
            coins = 750;
            break;

        case "extracurricular":
            coins = 100
            break;

        default:
            coins = 0;
    }

    return coins

    // {
    //     ecredCoins: coins,
    //     // rsEquivalent: coins / 10 // 10 coins = 1 Rs
    // };
}



export const calculateReputation = (category: string, position: string) => {
    return 100; //will be same as coins ( mostly )
}
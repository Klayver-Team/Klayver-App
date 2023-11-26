import { Href } from "expo-router"


export interface Finance{
    id: number,
    icon: string,
    title: string,
    body: string,
    buttontext: string,
    path: Href<string>
}

export interface FieldTexts{
    id: number,
    label: string,
    name?: string,
    placeholder: string,
    rightIconText?: string,
    enabled?: boolean
}
export const FinanceTexts : Finance[]= [
    {
        id: 1,
        icon: "🫴🏽",
        title: "Loan",
        body: "Access the funds you need swiftly with our hassle-free loan solutions",
        buttontext: "Get a loan",
        path: "/getLoan"
    },

    {
        id: 2,
        icon: "🧿",
        title: "Insurance",
        body: "Protect your today for a secure tomorrow with our comprehensive insurance coverage",
        buttontext: "Get a insurance",
        path: "/talentForm"
    }
]
 export const FormInputFields: FieldTexts[] = [{
        id: 1,
        name: "username",
    label: "Username",
    placeholder: "Enter username"
},
    {
        id: 2,
        label: "Bio",
        name:"bio",
        placeholder: "Tell us about yourself"
    },
    {
        id: 3,
        label: "Profession",
        name: "profession",
        placeholder: "Enter profession here"
    },
    {
        id: 4,
        name: "wallet",
        label: "Wallet Address",
        placeholder:"Wallet address",
        enabled: false,
    },
    {
        id: 5,
        label: "Hourly rate",
        name: "rate",
        placeholder: "Enter your rate here",
        rightIconText: "$",
    },
    {
        id: 6,
        name: "portfolio",
        label: "Portfolio link",
        placeholder: "https://",
    },
    {
        id: 7,
        label: "Talent token symbol",
        placeholder: "Enter token symbol",
        rightIconText: "$",
        name: "talent"
    }
]

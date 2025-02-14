import type { Meta, StoryObj } from "@storybook/react";
import { createKcPageStory } from "../KcPageStory";
import { useEffect, useState } from "react";

const { KcPageStory } = createKcPageStory({ pageId: "error.ftl" });

const meta = {
    title: "login/error.ftl",
    component: KcPageStory
} satisfies Meta<typeof KcPageStory>;

export default meta;

type Story = StoryObj<typeof meta>;

const useLanguage = () => {
    const [language, setLanguage] = useState<string>("fr");

    useEffect(() => {
        const userLang = navigator.language;
        setLanguage(userLang.startsWith("nl") ? "nl" : "fr");
    }, []);

    return language;
};

const ErrorPageContent = ({ errorMessage }: { errorMessage: string }) => {
    const language = useLanguage();
    const logoSrc = "/keycloak-resources/login/resources/img/ABVV-logo-NLFR.png";
    const homeLink = language === "nl" ? "https://abvv.be/mijn-abvv" : "https://fgtb.be/my-fgtb";

    const content = language === "nl" ? {
        title: "Authenticatie Mislukt",
        message: "We konden uw sessie niet authentiseren. Probeer het later opnieuw.",
        linkText: "Terug naar de Mijn ABVV Homepage"
    } : {
        title: "Échec de l'authentification",
        message: "Nous n'avons pas pu authentifier votre session. Veuillez réessayer plus tard.",
        linkText: "Retourner à la page d'accueil de My FGTB"
    };

    return (
        <div className="error-container" style={{
            textAlign: "center",
            backgroundColor: "#fff",
            padding: "30px",
            borderRadius: "8px",
            boxShadow: "0 0 15px rgba(0, 0, 0, 0.1)"
        }}>
            <img src={logoSrc} alt="FGTB Logo" style={{ maxWidth: "150px", marginBottom: "20px" }} />
            <h1>{content.title}</h1>
            <p>{errorMessage || content.message}</p>
            <a href={homeLink} style={{
                display: "inline-block",
                marginTop: "20px",
                padding: "10px 20px",
                fontSize: "16px",
                color: "#fff",
                backgroundColor: "#d9534f",
                textDecoration: "none",
                borderRadius: "5px",
                transition: "background-color 0.3s"
            }}>
                {content.linkText}
            </a>
        </div>
    );
};

export const Default: Story = {
    render: () => <ErrorPageContent errorMessage="" />
};

export const WithAnotherMessage: Story = {
    render: () => (
        <ErrorPageContent errorMessage="With another error message" />
    )
};

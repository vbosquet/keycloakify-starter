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
    const logoSrc = "/assets/img/ABVV-logo-NLFR.png";
    const homeLink = language === "nl" ? "https://abvv.be/mijn-abvv" : "https://fgtb.be/my-fgtb";

    const content = language === "nl" ? {
        title: "Authenticatie Mislukt",
        message: "Wij vinden voor het rijksregisternummer dat je gebruikt geen gegevens terug. Het gaat zowel over je lidmaatschap als over je (eventueel) dossier werkloosheid.",
        linkText: "Terug naar de Mijn ABVV Homepage"
    } : {
        title: "Échec de l'authentification",
        message: "Votre numéro de registre national n'est pas connu dans notre base de données. Cela concerne à la fois votre affiliation et votre éventuel dossier chômage. Pour plus d'informations, n'hésitez pas à contacter votre bureau FGTB.",
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


export class Data {
    projects: Project[];
    categories: Categorie[];
    creditCategories: CreditCategorie[];
    credits: Credit[];
    projectTasks: ProjectTask[];
}

export class Project {
    key: string;
    kTitle: string;
    kSubtitle: string;
    kDescription: string;
    date: Date;
    srcImage: string;
    srcLogo: string;
    srcVideo: string;
    categorie: string;
    imageCount: string;
    techLogos: string;
    duration: string;

    parse() {
        this.date = new Date(this.date);
    }
}

export class Categorie{
    key: string;
    kName: string;
    order: string;
}

export class CreditCategorie {
    key: string;
    kName: string;
}

export class Credit {
    key: string;
    project: string;
    categorie: string;
}

export class ProjectTask {
    ket: string;
    project: string;
    description: string;
}
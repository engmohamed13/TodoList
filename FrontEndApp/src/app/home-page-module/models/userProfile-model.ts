export class UserProfile {
    applicationId: string;
    userPhoto: string;
    number: number;
    subProgramTitle: string;
    subProgramDescription: string;
    applyDate: string;
    status: boolean;
    completePercentage: number;
    isCompleted: number;
    profileImageMediaId: string;
    isMainProfile: boolean;
}

export class AnonymousTicketBindingModel {
    firstName: string
    lastName: string
    phone: string
    email: string
    title: string
    description: string
    category: string
    newAttachmentPath: string
    attachmentId: string
}
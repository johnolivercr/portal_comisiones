export class BedrockHaiku {
    id: number;
    type: string;
    role: string;
    model: string;
    stop_sequence: string;
    usage: Usage;
    content: Content[];
    stop_reason: string;

    constructor() {
        this.id = 0;
        this.type = '';
        this.role = '';
        this.model = '';
        this.stop_sequence = '';
        this.usage = {
            input_tokens: 0,
            output_tokens: 0
        }
        this.content = []
        this.stop_reason = '';
    }
}

export interface Usage {
    input_tokens: number;
    output_tokens: number;
}

export interface Content {
    type: string;
    text: string;
}
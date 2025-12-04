import { encoding_for_model } from "tiktoken";
import fs from 'fs';

async function contarTokens() {
    //Seleccionar modelo
    const encoding = encoding_for_model('gpt-4');

    const text = fs.readFileSync('years.txt','utf-8'); 
    const chunkSize = 15000;
    
    let totalTokens = 0;
    
    // Dividir el texto en chunks de 15000 caracteres
    for (let i = 0; i < text.length; i += chunkSize) {
        const chunk = text.slice(i, i + chunkSize);
        const generado = encoding.encode(chunk);
        totalTokens += generado.length;
        console.log(`Chunk ${Math.floor(i/chunkSize) + 1}: ${generado.length} tokens`);
    }
    
    console.log(`\nCantidad total de tokens generados: ${totalTokens}`);
    
    //Calcular costos
    const costoporMilTokens = 0.03;
    const costoFinal = (totalTokens * costoporMilTokens) / 1000;
    console.log(`Costo estimado: $${costoFinal.toFixed(4)}`);
}
contarTokens();
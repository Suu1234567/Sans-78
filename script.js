// Sans 78 - Color Palette Generator
class ColorPaletteGenerator {
    constructor() {
        this.colors = [];
        this.generatedCount = 0;
        this.init();
    }

    init() {
        // Generate initial palette
        this.generatePalette();

        // Event listeners
        document.getElementById('generateBtn').addEventListener('click', () => this.generatePalette());
        document.getElementById('exportBtn').addEventListener('click', () => this.exportColors());

        // Copy button listeners
        document.querySelectorAll('.copy-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.copyToClipboard(e));
        });

        // Click on color box to regenerate that specific color
        document.querySelectorAll('.color-box').forEach((box, index) => {
            box.addEventListener('click', () => this.regenerateColor(index));
        });
    }

    generateRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    generatePalette() {
        this.colors = [];
        for (let i = 0; i < 5; i++) {
            this.colors.push(this.generateRandomColor());
        }
        this.updateDisplay();
        this.generatedCount++;
        document.getElementById('count').textContent = this.generatedCount;
    }

    regenerateColor(index) {
        this.colors[index] = this.generateRandomColor();
        this.updateDisplay();
    }

    updateDisplay() {
        // Update color boxes
        this.colors.forEach((color, index) => {
            const box = document.getElementById(`color${index + 1}`);
            box.style.backgroundColor = color;
            
            // Update code input
            const codeInput = document.getElementById(`code${index + 1}`);
            codeInput.value = color;
        });
    }

    copyToClipboard(e) {
        const btn = e.target;
        const targetId = btn.getAttribute('data-target');
        const input = document.getElementById(targetId);
        
        input.select();
        document.execCommand('copy');

        // Visual feedback
        btn.textContent = 'Copied!';
        btn.classList.add('copied');

        setTimeout(() => {
            btn.textContent = 'Copy';
            btn.classList.remove('copied');
        }, 2000);
    }

    exportColors() {
        const colorString = this.colors.join('\n');
        const blob = new Blob([colorString], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'palette-sans78.txt';
        a.click();
        window.URL.revokeObjectURL(url);
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new ColorPaletteGenerator();
});
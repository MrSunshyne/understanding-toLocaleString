import './style.css'

const locales = [
  { code: 'en-US', name: 'English (US)' },
  { code: 'en-GB', name: 'English (UK)' },
  { code: 'fr-FR', name: 'French' },
  { code: 'es-ES', name: 'Spanish' },
  { code: 'de-DE', name: 'German' },
  { code: 'ja-JP', name: 'Japanese' },
  { code: 'ar-SA', name: 'Arabic' },
  { code: 'hi-IN', name: 'Hindi' }
];

const testCases = [
  { value: 1234567.89, description: 'Large decimal' },
  { value: 0.0001, description: 'Small decimal' },
  { value: -5432.1, description: 'Negative number' },
  { value: 1000000000, description: 'Billion' },
  { value: 42, description: 'Integer' },
  { value: 3.14159265359, description: 'Pi' }
];

document.querySelector('#app').innerHTML = `
  <div class="container">
    <h1>toLocaleString() Interactive Guide</h1>
    <p class="subtitle">Explore how numbers are formatted across different locales</p>

    <div class="syntax-section">
      <h2>Syntax</h2>
      <pre><code>number.toLocaleString(locales, options)</code></pre>
      <ul>
        <li><strong>locales</strong> (optional): String or array of locale codes (e.g., 'en-US', 'fr-FR'). If omitted, uses browser's default locale.</li>
        <li><strong>options</strong> (optional): Object to customize formatting behavior.</li>
      </ul>
    </div>

    <div class="input-section">
      <label for="custom-number">Enter a number:</label>
      <input type="number" id="custom-number" value="1234567.89" step="any">
    </div>

    <div class="results-section">
      <h2>Basic Formatting</h2>
      <div class="code-example">
        <pre><code>const num = <span id="example-num-1">1234567.89</span>;
num.toLocaleString('en-US');  // "1,234,567.89"
num.toLocaleString('fr-FR');  // "1 234 567,89"
num.toLocaleString();          // Uses browser locale</code></pre>
      </div>
      <div id="basic-results"></div>
    </div>

    <div class="results-section">
      <h2>Currency Formatting</h2>
      <div class="code-example">
        <pre><code>const price = <span id="example-num-2">1234567.89</span>;
price.toLocaleString('en-US', {
  style: 'currency',
  currency: '<span id="example-currency">USD</span>'
});</code></pre>
      </div>
      <div class="controls">
        <label for="currency-select">Currency:</label>
        <select id="currency-select">
          <option value="USD">USD ($)</option>
          <option value="EUR">EUR (€)</option>
          <option value="GBP">GBP (£)</option>
          <option value="JPY">JPY (¥)</option>
        </select>
      </div>
      <div id="currency-results"></div>
    </div>

    <div class="results-section">
      <h2>Decimal Precision</h2>
      <div class="code-example">
        <pre><code>const value = <span id="example-num-3">1234567.89</span>;
value.toLocaleString('en-US', {
  minimumFractionDigits: <span id="example-decimals">2</span>,
  maximumFractionDigits: <span id="example-decimals-max">2</span>
});</code></pre>
      </div>
      <div class="controls">
        <label for="decimal-places">Decimal places:</label>
        <input type="number" id="decimal-places" value="2" min="0" max="10">
      </div>
      <div id="decimal-results"></div>
    </div>

    <div class="results-section">
      <h2>Common Options</h2>
      <div class="options-grid">
        <div class="option-card">
          <h3>style</h3>
          <code>'decimal'</code> (default)<br>
          <code>'currency'</code><br>
          <code>'percent'</code><br>
          <code>'unit'</code>
        </div>
        <div class="option-card">
          <h3>currency</h3>
          <code>'USD'</code>, <code>'EUR'</code>, <code>'GBP'</code>, etc.<br>
          <small>Required when style is 'currency'</small>
        </div>
        <div class="option-card">
          <h3>minimumFractionDigits</h3>
          <code>0</code> to <code>20</code><br>
          <small>Minimum decimal places</small>
        </div>
        <div class="option-card">
          <h3>maximumFractionDigits</h3>
          <code>0</code> to <code>20</code><br>
          <small>Maximum decimal places</small>
        </div>
        <div class="option-card">
          <h3>useGrouping</h3>
          <code>true</code> (default) or <code>false</code><br>
          <small>Show thousand separators</small>
        </div>
        <div class="option-card">
          <h3>notation</h3>
          <code>'standard'</code> (default)<br>
          <code>'scientific'</code><br>
          <code>'engineering'</code><br>
          <code>'compact'</code>
        </div>
      </div>
    </div>

    <div class="results-section">
      <h2>Test Cases</h2>
      <div id="test-cases"></div>
    </div>

    <div class="results-section">
      <h2>Auto-Detection</h2>
      <p>When no locale is specified, <code>toLocaleString()</code> uses the browser's default locale based on user preferences.</p>
      <div class="code-example">
        <pre><code>// Auto-detect from browser
(1234.56).toLocaleString();

// Your browser's locale: <strong id="browser-locale"></strong>
// Result: <strong id="browser-result"></strong></code></pre>
      </div>
    </div>
  </div>
`;

function updateBasicResults() {
  const number = parseFloat(document.getElementById('custom-number').value) || 0;
  const container = document.getElementById('basic-results');

  container.innerHTML = locales.map(locale => `
    <div class="result-row">
      <span class="locale-name">${locale.name}:</span>
      <code>${number.toLocaleString(locale.code)}</code>
    </div>
  `).join('');
}

function updateCurrencyResults() {
  const number = parseFloat(document.getElementById('custom-number').value) || 0;
  const currency = document.getElementById('currency-select').value;
  const container = document.getElementById('currency-results');

  container.innerHTML = locales.map(locale => {
    try {
      const formatted = number.toLocaleString(locale.code, {
        style: 'currency',
        currency: currency
      });
      return `
        <div class="result-row">
          <span class="locale-name">${locale.name}:</span>
          <code>${formatted}</code>
        </div>
      `;
    } catch (e) {
      return `
        <div class="result-row">
          <span class="locale-name">${locale.name}:</span>
          <code class="error">Error: ${e.message}</code>
        </div>
      `;
    }
  }).join('');
}

function updateDecimalResults() {
  const number = parseFloat(document.getElementById('custom-number').value) || 0;
  const decimalPlaces = parseInt(document.getElementById('decimal-places').value) || 2;
  const container = document.getElementById('decimal-results');

  container.innerHTML = locales.map(locale => `
    <div class="result-row">
      <span class="locale-name">${locale.name}:</span>
      <code>${number.toLocaleString(locale.code, {
        minimumFractionDigits: decimalPlaces,
        maximumFractionDigits: decimalPlaces
      })}</code>
    </div>
  `).join('');
}

function updateTestCases() {
  const container = document.getElementById('test-cases');

  container.innerHTML = testCases.map(testCase => `
    <div class="test-case">
      <h3>${testCase.description} (${testCase.value})</h3>
      ${locales.slice(0, 4).map(locale => `
        <div class="result-row">
          <span class="locale-name">${locale.name}:</span>
          <code>${testCase.value.toLocaleString(locale.code)}</code>
        </div>
      `).join('')}
    </div>
  `).join('');
}

function updateCodeExamples() {
  const number = parseFloat(document.getElementById('custom-number').value) || 0;
  const currency = document.getElementById('currency-select').value;
  const decimalPlaces = parseInt(document.getElementById('decimal-places').value) || 2;

  document.getElementById('example-num-1').textContent = number;
  document.getElementById('example-num-2').textContent = number;
  document.getElementById('example-num-3').textContent = number;
  document.getElementById('example-currency').textContent = currency;
  document.getElementById('example-decimals').textContent = decimalPlaces;
  document.getElementById('example-decimals-max').textContent = decimalPlaces;
}

function updateBrowserLocale() {
  const browserLocale = navigator.language || navigator.userLanguage || 'unknown';
  const testNumber = 1234.56;
  document.getElementById('browser-locale').textContent = browserLocale;
  document.getElementById('browser-result').textContent = testNumber.toLocaleString();
}

function updateAll() {
  updateBasicResults();
  updateCurrencyResults();
  updateDecimalResults();
  updateTestCases();
  updateCodeExamples();
  updateBrowserLocale();
}

document.getElementById('custom-number').addEventListener('input', updateAll);
document.getElementById('currency-select').addEventListener('change', () => {
  updateCurrencyResults();
  updateCodeExamples();
});
document.getElementById('decimal-places').addEventListener('input', () => {
  updateDecimalResults();
  updateCodeExamples();
});

updateAll();

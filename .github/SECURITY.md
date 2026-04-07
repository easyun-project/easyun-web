# Security Policy

## Supported Versions

| Version | Supported          |
|---------|--------------------||
| 0.4.x   | ✅ Current release |
| < 0.4   | ❌ No longer supported |

## Reporting a Vulnerability

If you discover a security vulnerability in Easyun, please report it responsibly.

**Do NOT open a public GitHub issue for security vulnerabilities.**

Instead, please send an email to: **easyun@myners.net**

Include the following in your report:

- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if any)

## Response Timeline

- **Acknowledgment**: Within 48 hours
- **Initial assessment**: Within 1 week
- **Fix release**: Depending on severity, typically within 2-4 weeks

## Scope

The following are in scope:

- Cross-site scripting (XSS)
- Authentication token exposure or bypass
- Sensitive data leakage (API keys, credentials in client-side code)
- Open redirect vulnerabilities
- CSRF attacks

The following are out of scope:

- Vulnerabilities in third-party dependencies (report to upstream maintainers)
- Issues requiring physical access to the user's machine
- Social engineering attacks

## Recognition

We appreciate responsible disclosure and will acknowledge security researchers in our release notes (with your permission).

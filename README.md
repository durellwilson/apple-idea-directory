# 🍎 Apple Idea Directory

AI-powered directory of infinite Apple ecosystem app ideas with enterprise-grade CI/CD.

## 🚀 Features

- **AI Generation** - GPT-4 with structured output
- **8 Platforms** - iOS, macOS, iPadOS, watchOS, tvOS, visionOS, Web, AirPods
- **Type-Safe** - Zod schema validation
- **Tested** - Jest + React Testing Library
- **Secure** - Security headers, input validation, rate limiting
- **CI/CD** - Automated testing, security scanning, deployment

## 🛡️ Security

- ✅ Security headers (HSTS, CSP, X-Frame-Options)
- ✅ Input validation with Zod
- ✅ Rate limiting (IP-based)
- ✅ Dependency scanning (Trivy)
- ✅ Automated security audits

## 🧪 Testing

```bash
npm test              # Run tests
npm run test:watch    # Watch mode
npm run type-check    # TypeScript check
npm run lint          # ESLint
```

## 📊 CI/CD Pipeline

### On Every Push
1. Type checking
2. Linting
3. Unit tests
4. Security scan
5. Build verification

### On Main Branch
6. Deploy to Vercel production

### Weekly
- Automated dependency updates
- Security audit
- Test suite

## 🔧 Development

```bash
npm install
npm run dev
```

## 📈 Monitoring

- Health check: `/api/health`
- Vercel Analytics
- Error tracking

## 🤝 Contributing

1. Fork repository
2. Create feature branch
3. Add tests
4. Submit PR (CI runs automatically)

---

**Production-ready with best practices** ✅

## ✅ Production-Ready

### Testing
- Unit tests: `npm test`
- E2E tests: `npm run test:e2e`
- Coverage: `npm run test:coverage`

### Backend
- Vercel KV persistence
- Rate limiting (10 req/min)
- Health checks: `/api/health`

### CI/CD
- Automated testing on every PR
- Security scanning
- 70%+ coverage required

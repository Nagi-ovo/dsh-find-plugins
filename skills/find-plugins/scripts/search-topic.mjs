#!/usr/bin/env node

/** Fetch every public, active repository carrying the `dsh-plugin` topic. */

import { execFileSync } from 'node:child_process'

const topic = 'dsh-plugin'
const query = `topic:${topic} is:public archived:false`
const pageSize = 100
const maxPages = 10
let token = process.env.GITHUB_TOKEN ?? process.env.GH_TOKEN ?? ''
if (token === '') {
  try {
    token = execFileSync('gh', ['auth', 'token'], { encoding: 'utf8', timeout: 5_000 }).trim()
  } catch {
    // An authenticated token only raises GitHub's rate limit; public search
    // remains functional when gh is absent or logged out.
    token = ''
  }
}
const repositories = []
const seen = new Set()

for (let page = 1; page <= maxPages; page += 1) {
  const url = new URL('https://api.github.com/search/repositories')
  url.searchParams.set('q', query)
  url.searchParams.set('sort', 'updated')
  url.searchParams.set('order', 'desc')
  url.searchParams.set('per_page', String(pageSize))
  url.searchParams.set('page', String(page))
  const headers = {
    accept: 'application/vnd.github+json',
    'user-agent': 'dsh-find-plugins',
    'x-github-api-version': '2022-11-28',
  }
  if (token !== '') headers.authorization = `Bearer ${token}`
  const response = await fetch(url, { headers, signal: AbortSignal.timeout(20_000) })
  if (!response.ok) {
    throw new Error(`GitHub topic search failed (${response.status}); authenticate gh or set GH_TOKEN and retry`)
  }
  const body = await response.json()
  if (!Array.isArray(body.items)) throw new Error('GitHub topic search returned no items array')
  for (const repo of body.items) {
    if (repo?.archived === true || repo?.disabled === true || repo?.fork === true) continue
    if (!Array.isArray(repo?.topics) || !repo.topics.includes(topic)) continue
    if (typeof repo?.full_name !== 'string' || seen.has(repo.full_name.toLowerCase())) continue
    seen.add(repo.full_name.toLowerCase())
    repositories.push({
      fullName: repo.full_name,
      name: repo.name,
      url: repo.html_url,
      description: repo.description ?? '',
      topics: repo.topics,
      language: repo.language,
      pushedAt: repo.pushed_at,
      updatedAt: repo.updated_at,
      defaultBranch: repo.default_branch,
      stars: repo.stargazers_count,
    })
  }
  const total = typeof body.total_count === 'number' ? body.total_count : body.items.length
  if (page * pageSize >= total || body.items.length < pageSize) break
}

process.stdout.write(`${JSON.stringify({ topic, repositories }, null, 2)}\n`)

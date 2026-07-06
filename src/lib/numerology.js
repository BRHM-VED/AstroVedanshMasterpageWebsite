// Chaldean numerology helpers
const CHALDEAN = {
  a: 1, i: 1, j: 1, q: 1, y: 1,
  b: 2, k: 2, r: 2,
  c: 3, g: 3, l: 3, s: 3,
  d: 4, m: 4, t: 4,
  e: 5, h: 5, n: 5, x: 5,
  u: 6, v: 6, w: 6,
  o: 7, z: 7,
  f: 8, p: 8,
}

const MEANINGS = {
  1: 'Sun — leadership, originality, ambition. You are built to initiate and inspire.',
  2: 'Moon — intuition, sensitivity, diplomacy. Partnerships and timing shape your path.',
  3: 'Jupiter — wisdom, expression, expansion. Teaching, guiding and creating suit you.',
  4: 'Rahu — unconventional, disciplined, methodical. You build systems others rely on.',
  5: 'Mercury — communication, versatility, commerce. Movement and networks bring luck.',
  6: 'Venus — harmony, beauty, magnetism. People, aesthetics and comfort follow you.',
  7: 'Ketu — depth, research, spirituality. You see what others miss.',
  8: 'Saturn — endurance, justice, mastery. Slow compounding success is your signature.',
  9: 'Mars — courage, drive, service. Energy well-directed makes you unstoppable.',
}

function digitSum(n) {
  while (n > 9 && n !== 11 && n !== 22) {
    n = String(n).split('').reduce((s, d) => s + Number(d), 0)
  }
  return n > 9 ? String(n).split('').reduce((s, d) => s + Number(d), 0) : n
}

export function mulank(dob) {
  return digitSum(dob.getDate())
}

export function bhagyank(dob) {
  const digits = `${dob.getDate()}${dob.getMonth() + 1}${dob.getFullYear()}`
  return digitSum(digits.split('').reduce((s, d) => s + Number(d), 0))
}

export function nameNumber(name) {
  const total = name
    .toLowerCase()
    .replace(/[^a-z]/g, '')
    .split('')
    .reduce((s, ch) => s + (CHALDEAN[ch] || 0), 0)
  return digitSum(total)
}

export function meaning(n) {
  return MEANINGS[n] || ''
}

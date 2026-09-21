import { useCallback, useEffect, useState } from 'react'
import {
  adminChangePin,
  adminLogin,
  adminLogout,
  adminSessionValid,
  createAdminPin,
  getAdminStatus,
} from '@/server/admin.functions'

const STORAGE_KEY = 'synex.admin.token'

/**
 * Sessão do painel admin. Vive no sessionStorage, por isso mantém-se enquanto o
 * separador estiver aberto e desaparece quando este fecha.
 */
export function useAdmin() {
  const [token, setToken] = useState<string | null>(null)
  const [configured, setConfigured] = useState<boolean | null>(null)

  useEffect(() => {
    let active = true
    const stored = sessionStorage.getItem(STORAGE_KEY)

    void (async () => {
      const [status, session] = await Promise.all([
        getAdminStatus(),
        stored ? adminSessionValid({ data: { token: stored } }) : null,
      ])
      if (!active) return
      setConfigured(status.configured)
      if (stored && session?.valid) {
        setToken(stored)
      } else if (stored) {
        sessionStorage.removeItem(STORAGE_KEY)
      }
    })()

    return () => {
      active = false
    }
  }, [])

  const persist = useCallback((value: string) => {
    sessionStorage.setItem(STORAGE_KEY, value)
    setToken(value)
  }, [])

  const login = useCallback(
    async (pin: string) => {
      const result = await adminLogin({ data: { pin } })
      persist(result.token)
    },
    [persist],
  )

  const setup = useCallback(
    async (pin: string) => {
      const result = await createAdminPin({ data: { pin } })
      setConfigured(true)
      persist(result.token)
    },
    [persist],
  )

  const logout = useCallback(async () => {
    const current = sessionStorage.getItem(STORAGE_KEY)
    sessionStorage.removeItem(STORAGE_KEY)
    setToken(null)
    if (current) await adminLogout({ data: { token: current } })
  }, [])

  const changePin = useCallback(
    async (currentPin: string, nextPin: string) => {
      if (!token) throw new Error('Sessão expirada.')
      await adminChangePin({ data: { token, currentPin, nextPin } })
    },
    [token],
  )

  return { token, configured, login, setup, logout, changePin }
}

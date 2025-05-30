/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private readonly currentLangKey = 'paimon-website-language';
  private readonly platformId = inject(PLATFORM_ID);

  setLanguage(lang: string): void {
    if (isPlatformBrowser(this.platformId) && window?.localStorage) {
      localStorage.setItem(this.currentLangKey, lang);
    }
  }

  getLanguage(fallback: string): string {
    if (isPlatformBrowser(this.platformId) && window?.localStorage) {
      return localStorage.getItem(this.currentLangKey) || fallback;
    }
    return fallback;
  }
}

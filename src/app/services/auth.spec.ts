import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { API_BASE_URL } from '../config';
import { RegisterPostData, User } from '../interfaces/auth';
import { Auth } from './auth';

describe('Auth', () => {
  let service: Auth;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(Auth);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('registerUser should POST to /users and return created user', () => {
    const postData: RegisterPostData = {
      fullName: 'Test User',
      email: 'test@example.com',
      password: 'secret'
    };
    const mockResponse: User = { id: '1', ...postData };

    service.registerUser(postData).subscribe((user) => {
      expect(user).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(
      (r) => r.method === 'POST' && r.url === `${API_BASE_URL}/users`
    );
    expect(req.request.body).toEqual(postData);
    req.flush(mockResponse);
  });

  it('getUserDetails should GET users filtered by email and password', () => {
    const email = 'e@x.com';
    const password = 'p';
    const mockUsers: User[] = [
      { id: '2', fullName: 'A', email, password }
    ];

    service.getUserDetails(email, password).subscribe((users) => {
      expect(users).toEqual(mockUsers);
    });

    const req = httpMock.expectOne(
      (r) => r.method === 'GET' && r.url === `${API_BASE_URL}/users?email=${email}&password=${password}`
    );
    req.flush(mockUsers);
  });
});

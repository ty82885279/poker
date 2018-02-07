/**
 * A playground acts like a container and organizer of display objects.
 * It tracks mouse positions, executes all children
 */
function Playground()
{
	Playground.prototype.initialize = function(aConstructorParams)
	{
		this.mConstructorParams = aConstructorParams;
		this.mMouseX = 0;
		this.mMouseY = 0;
		this.mDisplayObjects = [];
		this.mDiv;
	}
	
	Playground.prototype.onMouseMove_browser = function(e)
	{
		this.mMouseX = e.pageX - this.mOffset.left; this.mMouseY = e.pageY - this.mOffset.top;
	}
	
	Playground.prototype.onMouseMove_mobile = function(e)
	{
		this.mMouseX = e.originalEvent.touches[0].pageX - this.mOffset.left; this.mMouseY = e.originalEvent.touches[0].pageY - this.mOffset.top ;
	}
	
	Playground.prototype.getDiv = function()
	{
		return this.mDiv;
	}
	
	Playground.prototype.setDiv = function( aStage )
	{
		var self = this;
		this.mDiv = aStage;
		this.mOffset = this.mDiv.offset();
		
		if(Environment.TARGET == E_Target.COMPUTER)
		{
			this.mDiv.mousemove( function(e){ self.onMouseMove_browser(e); });
		}else{
			this.mDiv.bind("touchstart", function(e){ self.onMouseMove_mobile(e); });
			this.mDiv.bind("touchmove", function(e){ self.onMouseMove_mobile(e); });
			this.mDiv.bind("touchend", function(e){ self.onMouseMove_mobile(e); });
		}
	}
	
	Playground.prototype.enter = function()
	{
		
	}
	
	Playground.prototype.exit = function()
	{
		
	}
	
	Playground.prototype.execute = function(aStep)
	{
		var aLength = this.mDisplayObjects.length;
		
		for(var p = 0; p < aLength; p++)
		{
			if( this.mDisplayObjects[p] )
			{
				this.mDisplayObjects[p].execute(aStep);
			}
		}
	}
	
	Playground.prototype.getMouseX = function()
	{
		return this.mMouseX;
	}
	
	Playground.prototype.getMouseY = function()
	{ 
		return this.mMouseY;
	}
	
	Playground.prototype.setMouseX = function( value )
	{
		this.mMouseX = value;
	}
	
	Playground.prototype.setMouseY = function( value )
	{
		this.mMouseY = value;
	}
	
	/**
	 * adds a DisplayObject to the playground
 	 * @param {Object} aChild a display object
	 */
	Playground.prototype.addChild = function( aChild )
	{
		aChild._setupDisplayObject();
		
		var el = aChild.getDiv();
		
		el.appendTo( this.mDiv );
		
		aChild.onAddedToStage( this );
		
		this.mDisplayObjects.push( aChild );
	}
	
	/**
	 * Removes a child from its parent and the playground 
 	 * @param {Object} aChild
	 */
	Playground.prototype.removeChild = function( aChild )
	{
		if( aChild.getParent() ){ aChild.getParent().removeChild(aChild); }
		aChild.getDiv().remove();
		
		this.mDisplayObjects.splice( this.mDisplayObjects.indexOf( aChild ), 1 );
	}
};

 /* END OF FILE gamekit/playground/Playground.js */ 

/* this class handles all the matrice calculations for the DisplayObject class */
// code adapted and updated from http://9elements.com/html5demos/matrix3d/
var Sylvester = {
    version: '0.1.3',
    precision: 1e-6
};

function Vector() {};
Vector.prototype = {
    e: function (i) {
        return (i < 1 || i > this.elements.length) ? null : this.elements[i - 1]
    },
    dimensions: function () {
        return this.elements.length
    },
    modulus: function () {
        return Math.sqrt(this.dot(this))
    },
    eql: function (a) {
        var n = this.elements.length;
        var V = a.elements || a;
        if (n != V.length) {
            return false
        }
        do {
            if (Math.abs(this.elements[n - 1] - V[n - 1]) > Sylvester.precision) {
                return false
            }
        } while (--n);
        return true
    },
    dup: function () {
        return Vector.create(this.elements)
    },
    map: function (a) {
        var b = [];
        this.each(function (x, i) {
            b.push(a(x, i))
        });
        return Vector.create(b)
    },
    each: function (a) {
        var n = this.elements.length,
            k = n,
            i;
        do {
            i = k - n;
            a(this.elements[i], i + 1)
        } while (--n)
    },
    toUnitVector: function () {
        var r = this.modulus();
        if (r === 0) {
            return this.dup()
        }
        return this.map(function (x) {
            return x / r
        })
    },
    angleFrom: function (a) {
        var V = a.elements || a;
        var n = this.elements.length,
            k = n,
            i;
        if (n != V.length) {
            return null
        }
        var b = 0,
            mod1 = 0,
            mod2 = 0;
        this.each(function (x, i) {
            b += x * V[i - 1];
            mod1 += x * x;
            mod2 += V[i - 1] * V[i - 1]
        });
        mod1 = Math.sqrt(mod1);
        mod2 = Math.sqrt(mod2);
        if (mod1 * mod2 === 0) {
            return null
        }
        var c = b / (mod1 * mod2);
        if (c < -1) {
            c = -1
        }
        if (c > 1) {
            c = 1
        }
        return Math.acos(c)
    },
    isParallelTo: function (a) {
        var b = this.angleFrom(a);
        return (b === null) ? null : (b <= Sylvester.precision)
    },
    isAntiparallelTo: function (a) {
        var b = this.angleFrom(a);
        return (b === null) ? null : (Math.abs(b - Math.PI) <= Sylvester.precision)
    },
    isPerpendicularTo: function (a) {
        var b = this.dot(a);
        return (b === null) ? null : (Math.abs(b) <= Sylvester.precision)
    },
    add: function (a) {
        var V = a.elements || a;
        if (this.elements.length != V.length) {
            return null
        }
        return this.map(function (x, i) {
            return x + V[i - 1]
        })
    },
    subtract: function (a) {
        var V = a.elements || a;
        if (this.elements.length != V.length) {
            return null
        }
        return this.map(function (x, i) {
            return x - V[i - 1]
        })
    },
    multiply: function (k) {
        return this.map(function (x) {
            return x * k
        })
    },
    x: function (k) {
        return this.multiply(k)
    },
    dot: function (a) {
        var V = a.elements || a;
        var i, product = 0,
            n = this.elements.length;
        if (n != V.length) {
            return null
        }
        do {
            product += this.elements[n - 1] * V[n - 1]
        } while (--n);
        return product
    },
    cross: function (a) {
        var B = a.elements || a;
        if (this.elements.length != 3 || B.length != 3) {
            return null
        }
        var A = this.elements;
        return Vector.create([(A[1] * B[2]) - (A[2] * B[1]), (A[2] * B[0]) - (A[0] * B[2]), (A[0] * B[1]) - (A[1] * B[0])])
    },
    max: function () {
        var m = 0,
            n = this.elements.length,
            k = n,
            i;
        do {
            i = k - n;
            if (Math.abs(this.elements[i]) > Math.abs(m)) {
                m = this.elements[i]
            }
        } while (--n);
        return m
    },
    indexOf: function (x) {
        var a = null,
            n = this.elements.length,
            k = n,
            i;
        do {
            i = k - n;
            if (a === null && this.elements[i] == x) {
                a = i + 1
            }
        } while (--n);
        return a
    },
    toDiagonalMatrix: function () {
        return Matrix.Diagonal(this.elements)
    },
    round: function () {
        return this.map(function (x) {
            return Math.round(x)
        })
    },
    snapTo: function (x) {
        return this.map(function (y) {
            return (Math.abs(y - x) <= Sylvester.precision) ? x : y
        })
    },
    distanceFrom: function (a) {
        if (a.anchor) {
            return a.distanceFrom(this)
        }
        var V = a.elements || a;
        if (V.length != this.elements.length) {
            return null
        }
        var b = 0,
            part;
        this.each(function (x, i) {
            part = x - V[i - 1];
            b += part * part
        });
        return Math.sqrt(b)
    },
    liesOn: function (a) {
        return a.contains(this)
    },
    liesIn: function (a) {
        return a.contains(this)
    },
    rotate: function (t, a) {
        var V, R, x, y, z;
        switch (this.elements.length) {
            case 2:
                V = a.elements || a;
                if (V.length != 2) {
                    return null
                }
                R = Matrix.Rotation(t).elements;
                x = this.elements[0] - V[0];
                y = this.elements[1] - V[1];
                return Vector.create([V[0] + R[0][0] * x + R[0][1] * y, V[1] + R[1][0] * x + R[1][1] * y]);
                break;
            case 3:
                if (!a.direction) {
                    return null
                }
                var C = a.pointClosestTo(this).elements;
                R = Matrix.Rotation(t, a.direction).elements;
                x = this.elements[0] - C[0];
                y = this.elements[1] - C[1];
                z = this.elements[2] - C[2];
                return Vector.create([C[0] + R[0][0] * x + R[0][1] * y + R[0][2] * z, C[1] + R[1][0] * x + R[1][1] * y + R[1][2] * z, C[2] + R[2][0] * x + R[2][1] * y + R[2][2] * z]);
                break;
            default:
                return null
        }
    },
    reflectionIn: function (a) {
        if (a.anchor) {
            var P = this.elements.slice();
            var C = a.pointClosestTo(P).elements;
            return Vector.create([C[0] + (C[0] - P[0]), C[1] + (C[1] - P[1]), C[2] + (C[2] - (P[2] || 0))])
        } else {
            var Q = a.elements || a;
            if (this.elements.length != Q.length) {
                return null
            }
            return this.map(function (x, i) {
                return Q[i - 1] + (Q[i - 1] - x)
            })
        }
    },
    to3D: function () {
        var V = this.dup();
        switch (V.elements.length) {
            case 3:
                break;
            case 2:
                V.elements.push(0);
                break;
            default:
                return null
        }
        return V
    },
    inspect: function () {
        return '[' + this.elements.join(', ') + ']'
    },
    setElements: function (a) {
        this.elements = (a.elements || a).slice();
        return this
    }
};
Vector.create = function (a) {
    var V = new Vector();
    return V.setElements(a)
};
Vector.i = Vector.create([1, 0, 0]);
Vector.j = Vector.create([0, 1, 0]);
Vector.k = Vector.create([0, 0, 1]);
Vector.Random = function (n) {
    var a = [];
    do {
        a.push(Math.random())
    } while (--n);
    return Vector.create(a)
};
Vector.Zero = function (n) {
    var a = [];
    do {
        a.push(0)
    } while (--n);
    return Vector.create(a)
};

function Matrix() {}
Matrix.prototype = {
    e: function (i, j) {
        if (i < 1 || i > this.elements.length || j < 1 || j > this.elements[0].length) {
            return null
        }
        return this.elements[i - 1][j - 1]
    },
    row: function (i) {
        if (i > this.elements.length) {
            return null
        }
        return Vector.create(this.elements[i - 1])
    },
    col: function (j) {
        if (j > this.elements[0].length) {
            return null
        }
        var a = [],
            n = this.elements.length,
            k = n,
            i;
        do {
            i = k - n;
            a.push(this.elements[i][j - 1])
        } while (--n);
        return Vector.create(a)
    },
    dimensions: function () {
        return {
            rows: this.elements.length,
            cols: this.elements[0].length
        }
    },
    rows: function () {
        return this.elements.length
    },
    cols: function () {
        return this.elements[0].length
    },
    eql: function (a) {
        var M = a.elements || a;
        if (typeof (M[0][0]) == 'undefined') {
            M = Matrix.create(M).elements
        }
        if (this.elements.length != M.length || this.elements[0].length != M[0].length) {
            return false
        }
        var b = this.elements.length,
            ki = b,
            i, nj, kj = this.elements[0].length,
            j;
        do {
            i = ki - b;
            nj = kj;
            do {
                j = kj - nj;
                if (Math.abs(this.elements[i][j] - M[i][j]) > Sylvester.precision) {
                    return false
                }
            } while (--nj)
        } while (--b);
        return true
    },
    dup: function () {
        return Matrix.create(this.elements)
    },
    map: function (a) {
        var b = [],
            ni = this.elements.length,
            ki = ni,
            i, nj, kj = this.elements[0].length,
            j;
        do {
            i = ki - ni;
            nj = kj;
            b[i] = [];
            do {
                j = kj - nj;
                b[i][j] = a(this.elements[i][j], i + 1, j + 1)
            } while (--nj)
        } while (--ni);
        return Matrix.create(b)
    },
    isSameSizeAs: function (a) {
        var M = a.elements || a;
        if (typeof (M[0][0]) == 'undefined') {
            M = Matrix.create(M).elements
        }
        return (this.elements.length == M.length && this.elements[0].length == M[0].length)
    },
    add: function (a) {
        var M = a.elements || a;
        if (typeof (M[0][0]) == 'undefined') {
            M = Matrix.create(M).elements
        }
        if (!this.isSameSizeAs(M)) {
            return null
        }
        return this.map(function (x, i, j) {
            return x + M[i - 1][j - 1]
        })
    },
    subtract: function (a) {
        var M = a.elements || a;
        if (typeof (M[0][0]) == 'undefined') {
            M = Matrix.create(M).elements
        }
        if (!this.isSameSizeAs(M)) {
            return null
        }
        return this.map(function (x, i, j) {
            return x - M[i - 1][j - 1]
        })
    },
    canMultiplyFromLeft: function (a) {
        var M = a.elements || a;
        if (typeof (M[0][0]) == 'undefined') {
            M = Matrix.create(M).elements
        }
        return (this.elements[0].length == M.length)
    },
    multiply: function (a) {
        if (!a.elements) {
            return this.map(function (x) {
                return x * a
            })
        }
        var b = a.modulus ? true : false;
        var M = a.elements || a;
        if (typeof (M[0][0]) == 'undefined') {
            M = Matrix.create(M).elements
        }
        if (!this.canMultiplyFromLeft(M)) {
            return null
        }
        var d = this.elements.length,
            ki = d,
            i, nj, kj = M[0].length,
            j;
        var e = this.elements[0].length,
            elements = [],
            sum, nc, c;
        do {
            i = ki - d;
            elements[i] = [];
            nj = kj;
            do {
                j = kj - nj;
                sum = 0;
                nc = e;
                do {
                    c = e - nc;
                    sum += this.elements[i][c] * M[c][j]
                } while (--nc);
                elements[i][j] = sum
            } while (--nj)
        } while (--d);
        var M = Matrix.create(elements);
        return b ? M.col(1) : M
    },
    x: function (a) {
        return this.multiply(a)
    },
    minor: function (a, b, c, d) {
        var e = [],
            ni = c,
            i, nj, j;
        var f = this.elements.length,
            cols = this.elements[0].length;
        do {
            i = c - ni;
            e[i] = [];
            nj = d;
            do {
                j = d - nj;
                e[i][j] = this.elements[(a + i - 1) % f][(b + j - 1) % cols]
            } while (--nj)
        } while (--ni);
        return Matrix.create(e)
    },
    transpose: function () {
        var a = this.elements.length,
            cols = this.elements[0].length;
        var b = [],
            ni = cols,
            i, nj, j;
        do {
            i = cols - ni;
            b[i] = [];
            nj = a;
            do {
                j = a - nj;
                b[i][j] = this.elements[j][i]
            } while (--nj)
        } while (--ni);
        return Matrix.create(b)
    },
    isSquare: function () {
        return (this.elements.length == this.elements[0].length)
    },
    max: function () {
        var m = 0,
            ni = this.elements.length,
            ki = ni,
            i, nj, kj = this.elements[0].length,
            j;
        do {
            i = ki - ni;
            nj = kj;
            do {
                j = kj - nj;
                if (Math.abs(this.elements[i][j]) > Math.abs(m)) {
                    m = this.elements[i][j]
                }
            } while (--nj)
        } while (--ni);
        return m
    },
    indexOf: function (x) {
        var a = null,
            ni = this.elements.length,
            ki = ni,
            i, nj, kj = this.elements[0].length,
            j;
        do {
            i = ki - ni;
            nj = kj;
            do {
                j = kj - nj;
                if (this.elements[i][j] == x) {
                    return {
                        i: i + 1,
                        j: j + 1
                    }
                }
            } while (--nj)
        } while (--ni);
        return null
    },
    diagonal: function () {
        if (!this.isSquare) {
            return null
        }
        var a = [],
            n = this.elements.length,
            k = n,
            i;
        do {
            i = k - n;
            a.push(this.elements[i][i])
        } while (--n);
        return Vector.create(a)
    },
    toRightTriangular: function () {
        var M = this.dup(),
            els;
        var n = this.elements.length,
            k = n,
            i, np, kp = this.elements[0].length,
            p;
        do {
            i = k - n;
            if (M.elements[i][i] == 0) {
                for (j = i + 1; j < k; j++) {
                    if (M.elements[j][i] != 0) {
                        els = [];
                        np = kp;
                        do {
                            p = kp - np;
                            els.push(M.elements[i][p] + M.elements[j][p])
                        } while (--np);
                        M.elements[i] = els;
                        break
                    }
                }
            }
            if (M.elements[i][i] != 0) {
                for (j = i + 1; j < k; j++) {
                    var a = M.elements[j][i] / M.elements[i][i];
                    els = [];
                    np = kp;
                    do {
                        p = kp - np;
                        els.push(p <= i ? 0 : M.elements[j][p] - M.elements[i][p] * a)
                    } while (--np);
                    M.elements[j] = els
                }
            }
        } while (--n);
        return M
    },
    toUpperTriangular: function () {
        return this.toRightTriangular()
    },
    determinant: function () {
        if (!this.isSquare()) {
            return null
        }
        var M = this.toRightTriangular();
        var a = M.elements[0][0],
            n = M.elements.length - 1,
            k = n,
            i;
        do {
            i = k - n + 1;
            a = a * M.elements[i][i]
        } while (--n);
        return a
    },
    det: function () {
        return this.determinant()
    },
    isSingular: function () {
        return (this.isSquare() && this.determinant() === 0)
    },
    trace: function () {
        if (!this.isSquare()) {
            return null
        }
        var a = this.elements[0][0],
            n = this.elements.length - 1,
            k = n,
            i;
        do {
            i = k - n + 1;
            a += this.elements[i][i]
        } while (--n);
        return a
    },
    tr: function () {
        return this.trace()
    },
    rank: function () {
        var M = this.toRightTriangular(),
            rank = 0;
        var a = this.elements.length,
            ki = a,
            i, nj, kj = this.elements[0].length,
            j;
        do {
            i = ki - a;
            nj = kj;
            do {
                j = kj - nj;
                if (Math.abs(M.elements[i][j]) > Sylvester.precision) {
                    rank++;
                    break
                }
            } while (--nj)
        } while (--a);
        return rank
    },
    rk: function () {
        return this.rank()
    },
    augment: function (a) {
        var M = a.elements || a;
        if (typeof (M[0][0]) == 'undefined') {
            M = Matrix.create(M).elements
        }
        var T = this.dup(),
            cols = T.elements[0].length;
        var b = T.elements.length,
            ki = b,
            i, nj, kj = M[0].length,
            j;
        if (b != M.length) {
            return null
        }
        do {
            i = ki - b;
            nj = kj;
            do {
                j = kj - nj;
                T.elements[i][cols + j] = M[i][j]
            } while (--nj)
        } while (--b);
        return T
    },
    inverse: function () {
        if (!this.isSquare() || this.isSingular()) {
            return null
        }
        var a = this.elements.length,
            ki = a,
            i, j;
        var M = this.augment(Matrix.I(a)).toRightTriangular();
        var b, kp = M.elements[0].length,
            p, els, divisor;
        var c = [],
            new_element;
        do {
            i = a - 1;
            els = [];
            b = kp;
            c[i] = [];
            divisor = M.elements[i][i];
            do {
                p = kp - b;
                new_element = M.elements[i][p] / divisor;
                els.push(new_element);
                if (p >= ki) {
                    c[i].push(new_element)
                }
            } while (--b);
            M.elements[i] = els;
            for (j = 0; j < i; j++) {
                els = [];
                b = kp;
                do {
                    p = kp - b;
                    els.push(M.elements[j][p] - M.elements[i][p] * M.elements[j][i])
                } while (--b);
                M.elements[j] = els
            }
        } while (--a);
        return Matrix.create(c)
    },
    inv: function () {
        return this.inverse()
    },
    round: function () {
        return this.map(function (x) {
            return Math.round(x)
        })
    },
    snapTo: function (x) {
        return this.map(function (p) {
            return (Math.abs(p - x) <= Sylvester.precision) ? x : p
        })
    },
    inspect: function () {
        var a = [];
        var n = this.elements.length,
            k = n,
            i;
        do {
            i = k - n;
            a.push(Vector.create(this.elements[i]).inspect())
        } while (--n);
        return a.join('\n')
    },
    setElements: function (a) {
        var i, elements = a.elements || a;
        if (typeof (elements[0][0]) != 'undefined') {
            var b = elements.length,
                ki = b,
                nj, kj, j;
            this.elements = [];
            do {
                i = ki - b;
                nj = elements[i].length;
                kj = nj;
                this.elements[i] = [];
                do {
                    j = kj - nj;
                    this.elements[i][j] = elements[i][j]
                } while (--nj)
            } while (--b);
            return this
        }
        var n = elements.length,
            k = n;
        this.elements = [];
        do {
            i = k - n;
            this.elements.push([elements[i]])
        } while (--n);
        return this
    }
};
Matrix.create = function (a) {
    var M = new Matrix();
    return M.setElements(a)
};
Matrix.I = function (n) {
    var a = [],
        k = n,
        i, nj, j;
    do {
        i = k - n;
        a[i] = [];
        nj = k;
        do {
            j = k - nj;
            a[i][j] = (i == j) ? 1 : 0
        } while (--nj)
    } while (--n);
    return Matrix.create(a)
};
Matrix.Diagonal = function (a) {
    var n = a.length,
        k = n,
        i;
    var M = Matrix.I(n);
    do {
        i = k - n;
        M.elements[i][i] = a[i]
    } while (--n);
    return M
};
Matrix.Rotation = function (b, a) {
    if (!a) {
        return Matrix.create([
            [Math.cos(b), -Math.sin(b)],
            [Math.sin(b), Math.cos(b)]
        ])
    }
    var d = a.dup();
    if (d.elements.length != 3) {
        return null
    }
    var e = d.modulus();
    var x = d.elements[0] / e,
        y = d.elements[1] / e,
        z = d.elements[2] / e;
    var s = Math.sin(b),
        c = Math.cos(b),
        t = 1 - c;
    return Matrix.create([
        [t * x * x + c, t * x * y - s * z, t * x * z + s * y],
        [t * x * y + s * z, t * y * y + c, t * y * z - s * x],
        [t * x * z - s * y, t * y * z + s * x, t * z * z + c]
    ])
};
Matrix.RotationX = function (t) {
    var c = Math.cos(t),
        s = Math.sin(t);
    return Matrix.create([
        [1, 0, 0],
        [0, c, -s],
        [0, s, c]
    ])
};
Matrix.RotationY = function (t) {
    var c = Math.cos(t),
        s = Math.sin(t);
    return Matrix.create([
        [c, 0, s],
        [0, 1, 0],
        [-s, 0, c]
    ])
};
Matrix.RotationZ = function (t) {
    var c = Math.cos(t),
        s = Math.sin(t);
    return Matrix.create([
        [c, -s, 0],
        [s, c, 0],
        [0, 0, 1]
    ])
};
Matrix.Random = function (n, m) {
    return Matrix.Zero(n, m).map(function () {
        return Math.random()
    })
};
Matrix.Zero = function (n, m) {
    var a = [],
        ni = n,
        i, nj, j;
    do {
        i = n - ni;
        a[i] = [];
        nj = m;
        do {
            j = m - nj;
            a[i][j] = 0
        } while (--nj)
    } while (--ni);
    return Matrix.create(a)
};

function Line() {}
Line.prototype = {
    eql: function (a) {
        return (this.isParallelTo(a) && this.contains(a.anchor))
    },
    dup: function () {
        return Line.create(this.anchor, this.direction)
    },
    translate: function (a) {
        var V = a.elements || a;
        return Line.create([this.anchor.elements[0] + V[0], this.anchor.elements[1] + V[1], this.anchor.elements[2] + (V[2] || 0)], this.direction)
    },
    isParallelTo: function (a) {
        if (a.normal) {
            return a.isParallelTo(this)
        }
        var b = this.direction.angleFrom(a.direction);
        return (Math.abs(b) <= Sylvester.precision || Math.abs(b - Math.PI) <= Sylvester.precision)
    },
    distanceFrom: function (a) {
        if (a.normal) {
            return a.distanceFrom(this)
        }
        if (a.direction) {
            if (this.isParallelTo(a)) {
                return this.distanceFrom(a.anchor)
            }
            var N = this.direction.cross(a.direction).toUnitVector().elements;
            var A = this.anchor.elements,
                B = a.anchor.elements;
            return Math.abs((A[0] - B[0]) * N[0] + (A[1] - B[1]) * N[1] + (A[2] - B[2]) * N[2])
        } else {
            var P = a.elements || a;
            var A = this.anchor.elements,
                D = this.direction.elements;
            var b = P[0] - A[0],
                PA2 = P[1] - A[1],
                PA3 = (P[2] || 0) - A[2];
            var c = Math.sqrt(b * b + PA2 * PA2 + PA3 * PA3);
            if (c === 0) return 0;
            var d = (b * D[0] + PA2 * D[1] + PA3 * D[2]) / c;
            var e = 1 - d * d;
            return Math.abs(c * Math.sqrt(e < 0 ? 0 : e))
        }
    },
    contains: function (a) {
        var b = this.distanceFrom(a);
        return (b !== null && b <= Sylvester.precision)
    },
    liesIn: function (a) {
        return a.contains(this)
    },
    intersects: function (a) {
        if (a.normal) {
            return a.intersects(this)
        }
        return (!this.isParallelTo(a) && this.distanceFrom(a) <= Sylvester.precision)
    },
    intersectionWith: function (a) {
        if (a.normal) {
            return a.intersectionWith(this)
        }
        if (!this.intersects(a)) {
            return null
        }
        var P = this.anchor.elements,
            X = this.direction.elements,
            Q = a.anchor.elements,
            Y = a.direction.elements;
        var b = X[0],
            X2 = X[1],
            X3 = X[2],
            Y1 = Y[0],
            Y2 = Y[1],
            Y3 = Y[2];
        var c = P[0] - Q[0],
            PsubQ2 = P[1] - Q[1],
            PsubQ3 = P[2] - Q[2];
        var d = -b * c - X2 * PsubQ2 - X3 * PsubQ3;
        var e = Y1 * c + Y2 * PsubQ2 + Y3 * PsubQ3;
        var f = b * b + X2 * X2 + X3 * X3;
        var g = Y1 * Y1 + Y2 * Y2 + Y3 * Y3;
        var h = b * Y1 + X2 * Y2 + X3 * Y3;
        var k = (d * g / f + h * e) / (g - h * h);
        return Vector.create([P[0] + k * b, P[1] + k * X2, P[2] + k * X3])
    },
    pointClosestTo: function (a) {
        if (a.direction) {
            if (this.intersects(a)) {
                return this.intersectionWith(a)
            }
            if (this.isParallelTo(a)) {
                return null
            }
            var D = this.direction.elements,
                E = a.direction.elements;
            var b = D[0],
                D2 = D[1],
                D3 = D[2],
                E1 = E[0],
                E2 = E[1],
                E3 = E[2];
            var x = (D3 * E1 - b * E3),
                y = (b * E2 - D2 * E1),
                z = (D2 * E3 - D3 * E2);
            var N = Vector.create([x * E3 - y * E2, y * E1 - z * E3, z * E2 - x * E1]);
            var P = Plane.create(a.anchor, N);
            return P.intersectionWith(this)
        } else {
            var P = a.elements || a;
            if (this.contains(P)) {
                return Vector.create(P)
            }
            var A = this.anchor.elements,
                D = this.direction.elements;
            var b = D[0],
                D2 = D[1],
                D3 = D[2],
                A1 = A[0],
                A2 = A[1],
                A3 = A[2];
            var x = b * (P[1] - A2) - D2 * (P[0] - A1),
                y = D2 * ((P[2] || 0) - A3) - D3 * (P[1] - A2),
                z = D3 * (P[0] - A1) - b * ((P[2] || 0) - A3);
            var V = Vector.create([D2 * x - D3 * z, D3 * y - b * x, b * z - D2 * y]);
            var k = this.distanceFrom(P) / V.modulus();
            return Vector.create([P[0] + V.elements[0] * k, P[1] + V.elements[1] * k, (P[2] || 0) + V.elements[2] * k])
        }
    },
    rotate: function (t, a) {
        if (typeof (a.direction) == 'undefined') {
            a = Line.create(a.to3D(), Vector.k)
        }
        var R = Matrix.Rotation(t, a.direction).elements;
        var C = a.pointClosestTo(this.anchor).elements;
        var A = this.anchor.elements,
            D = this.direction.elements;
        var b = C[0],
            C2 = C[1],
            C3 = C[2],
            A1 = A[0],
            A2 = A[1],
            A3 = A[2];
        var x = A1 - b,
            y = A2 - C2,
            z = A3 - C3;
        return Line.create([b + R[0][0] * x + R[0][1] * y + R[0][2] * z, C2 + R[1][0] * x + R[1][1] * y + R[1][2] * z, C3 + R[2][0] * x + R[2][1] * y + R[2][2] * z], [R[0][0] * D[0] + R[0][1] * D[1] + R[0][2] * D[2], R[1][0] * D[0] + R[1][1] * D[1] + R[1][2] * D[2], R[2][0] * D[0] + R[2][1] * D[1] + R[2][2] * D[2]])
    },
    reflectionIn: function (a) {
        if (a.normal) {
            var A = this.anchor.elements,
                D = this.direction.elements;
            var b = A[0],
                A2 = A[1],
                A3 = A[2],
                D1 = D[0],
                D2 = D[1],
                D3 = D[2];
            var c = this.anchor.reflectionIn(a).elements;
            var d = b + D1,
                AD2 = A2 + D2,
                AD3 = A3 + D3;
            var Q = a.pointClosestTo([d, AD2, AD3]).elements;
            var e = [Q[0] + (Q[0] - d) - c[0], Q[1] + (Q[1] - AD2) - c[1], Q[2] + (Q[2] - AD3) - c[2]];
            return Line.create(c, e)
        } else if (a.direction) {
            return this.rotate(Math.PI, a)
        } else {
            var P = a.elements || a;
            return Line.create(this.anchor.reflectionIn([P[0], P[1], (P[2] || 0)]), this.direction)
        }
    },
    setVectors: function (a, b) {
        a = Vector.create(a);
        b = Vector.create(b);
        if (a.elements.length == 2) {
            a.elements.push(0)
        }
        if (b.elements.length == 2) {
            b.elements.push(0)
        }
        if (a.elements.length > 3 || b.elements.length > 3) {
            return null
        }
        var c = b.modulus();
        if (c === 0) {
            return null
        }
        this.anchor = a;
        this.direction = Vector.create([b.elements[0] / c, b.elements[1] / c, b.elements[2] / c]);
        return this
    }
};
Line.create = function (a, b) {
    var L = new Line();
    return L.setVectors(a, b)
};
Line.X = Line.create(Vector.Zero(3), Vector.i);
Line.Y = Line.create(Vector.Zero(3), Vector.j);
Line.Z = Line.create(Vector.Zero(3), Vector.k);

function Plane() {}
Plane.prototype = {
    eql: function (a) {
        return (this.contains(a.anchor) && this.isParallelTo(a))
    },
    dup: function () {
        return Plane.create(this.anchor, this.normal)
    },
    translate: function (a) {
        var V = a.elements || a;
        return Plane.create([this.anchor.elements[0] + V[0], this.anchor.elements[1] + V[1], this.anchor.elements[2] + (V[2] || 0)], this.normal)
    },
    isParallelTo: function (a) {
        var b;
        if (a.normal) {
            b = this.normal.angleFrom(a.normal);
            return (Math.abs(b) <= Sylvester.precision || Math.abs(Math.PI - b) <= Sylvester.precision)
        } else if (a.direction) {
            return this.normal.isPerpendicularTo(a.direction)
        }
        return null
    },
    isPerpendicularTo: function (a) {
        var b = this.normal.angleFrom(a.normal);
        return (Math.abs(Math.PI / 2 - b) <= Sylvester.precision)
    },
    distanceFrom: function (a) {
        if (this.intersects(a) || this.contains(a)) {
            return 0
        }
        if (a.anchor) {
            var A = this.anchor.elements,
                B = a.anchor.elements,
                N = this.normal.elements;
            return Math.abs((A[0] - B[0]) * N[0] + (A[1] - B[1]) * N[1] + (A[2] - B[2]) * N[2])
        } else {
            var P = a.elements || a;
            var A = this.anchor.elements,
                N = this.normal.elements;
            return Math.abs((A[0] - P[0]) * N[0] + (A[1] - P[1]) * N[1] + (A[2] - (P[2] || 0)) * N[2])
        }
    },
    contains: function (a) {
        if (a.normal) {
            return null
        }
        if (a.direction) {
            return (this.contains(a.anchor) && this.contains(a.anchor.add(a.direction)))
        } else {
            var P = a.elements || a;
            var A = this.anchor.elements,
                N = this.normal.elements;
            var b = Math.abs(N[0] * (A[0] - P[0]) + N[1] * (A[1] - P[1]) + N[2] * (A[2] - (P[2] || 0)));
            return (b <= Sylvester.precision)
        }
    },
    intersects: function (a) {
        if (typeof (a.direction) == 'undefined' && typeof (a.normal) == 'undefined') {
            return null
        }
        return !this.isParallelTo(a)
    },
    intersectionWith: function (a) {
        if (!this.intersects(a)) {
            return null
        }
        if (a.direction) {
            var A = a.anchor.elements,
                D = a.direction.elements,
                P = this.anchor.elements,
                N = this.normal.elements;
            var b = (N[0] * (P[0] - A[0]) + N[1] * (P[1] - A[1]) + N[2] * (P[2] - A[2])) / (N[0] * D[0] + N[1] * D[1] + N[2] * D[2]);
            return Vector.create([A[0] + D[0] * b, A[1] + D[1] * b, A[2] + D[2] * b])
        } else if (a.normal) {
            var c = this.normal.cross(a.normal).toUnitVector();
            var N = this.normal.elements,
                A = this.anchor.elements,
                O = a.normal.elements,
                B = a.anchor.elements;
            var d = Matrix.Zero(2, 2),
                i = 0;
            while (d.isSingular()) {
                i++;
                d = Matrix.create([
                    [N[i % 3], N[(i + 1) % 3]],
                    [O[i % 3], O[(i + 1) % 3]]
                ])
            }
            var e = d.inverse().elements;
            var x = N[0] * A[0] + N[1] * A[1] + N[2] * A[2];
            var y = O[0] * B[0] + O[1] * B[1] + O[2] * B[2];
            var f = [e[0][0] * x + e[0][1] * y, e[1][0] * x + e[1][1] * y];
            var g = [];
            for (var j = 1; j <= 3; j++) {
                g.push((i == j) ? 0 : f[(j + (5 - i) % 3) % 3])
            }
            return Line.create(g, c)
        }
    },
    pointClosestTo: function (a) {
        var P = a.elements || a;
        var A = this.anchor.elements,
            N = this.normal.elements;
        var b = (A[0] - P[0]) * N[0] + (A[1] - P[1]) * N[1] + (A[2] - (P[2] || 0)) * N[2];
        return Vector.create([P[0] + N[0] * b, P[1] + N[1] * b, (P[2] || 0) + N[2] * b])
    },
    rotate: function (t, a) {
        var R = Matrix.Rotation(t, a.direction).elements;
        var C = a.pointClosestTo(this.anchor).elements;
        var A = this.anchor.elements,
            N = this.normal.elements;
        var b = C[0],
            C2 = C[1],
            C3 = C[2],
            A1 = A[0],
            A2 = A[1],
            A3 = A[2];
        var x = A1 - b,
            y = A2 - C2,
            z = A3 - C3;
        return Plane.create([b + R[0][0] * x + R[0][1] * y + R[0][2] * z, C2 + R[1][0] * x + R[1][1] * y + R[1][2] * z, C3 + R[2][0] * x + R[2][1] * y + R[2][2] * z], [R[0][0] * N[0] + R[0][1] * N[1] + R[0][2] * N[2], R[1][0] * N[0] + R[1][1] * N[1] + R[1][2] * N[2], R[2][0] * N[0] + R[2][1] * N[1] + R[2][2] * N[2]])
    },
    reflectionIn: function (a) {
        if (a.normal) {
            var A = this.anchor.elements,
                N = this.normal.elements;
            var b = A[0],
                A2 = A[1],
                A3 = A[2],
                N1 = N[0],
                N2 = N[1],
                N3 = N[2];
            var c = this.anchor.reflectionIn(a).elements;
            var d = b + N1,
                AN2 = A2 + N2,
                AN3 = A3 + N3;
            var Q = a.pointClosestTo([d, AN2, AN3]).elements;
            var e = [Q[0] + (Q[0] - d) - c[0], Q[1] + (Q[1] - AN2) - c[1], Q[2] + (Q[2] - AN3) - c[2]];
            return Plane.create(c, e)
        } else if (a.direction) {
            return this.rotate(Math.PI, a)
        } else {
            var P = a.elements || a;
            return Plane.create(this.anchor.reflectionIn([P[0], P[1], (P[2] || 0)]), this.normal)
        }
    },
    setVectors: function (a, b, c) {
        a = Vector.create(a);
        a = a.to3D();
        if (a === null) {
            return null
        }
        b = Vector.create(b);
        b = b.to3D();
        if (b === null) {
            return null
        }
        if (typeof (c) == 'undefined') {
            c = null
        } else {
            c = Vector.create(c);
            c = c.to3D();
            if (c === null) {
                return null
            }
        }
        var d = a.elements[0],
            A2 = a.elements[1],
            A3 = a.elements[2];
        var e = b.elements[0],
            v12 = b.elements[1],
            v13 = b.elements[2];
        var f, mod;
        if (c !== null) {
            var g = c.elements[0],
                v22 = c.elements[1],
                v23 = c.elements[2];
            f = Vector.create([(v12 - A2) * (v23 - A3) - (v13 - A3) * (v22 - A2), (v13 - A3) * (g - d) - (e - d) * (v23 - A3), (e - d) * (v22 - A2) - (v12 - A2) * (g - d)]);
            mod = f.modulus();
            if (mod === 0) {
                return null
            }
            f = Vector.create([f.elements[0] / mod, f.elements[1] / mod, f.elements[2] / mod])
        } else {
            mod = Math.sqrt(e * e + v12 * v12 + v13 * v13);
            if (mod === 0) {
                return null
            }
            f = Vector.create([b.elements[0] / mod, b.elements[1] / mod, b.elements[2] / mod])
        }
        this.anchor = a;
        this.normal = f;
        return this
    }
};
Plane.create = function (a, b, c) {
    var P = new Plane();
    return P.setVectors(a, b, c)
};
Plane.XY = Plane.create(Vector.Zero(3), Vector.k);
Plane.YZ = Plane.create(Vector.Zero(3), Vector.i);
Plane.ZX = Plane.create(Vector.Zero(3), Vector.j);
Plane.YX = Plane.XY;
Plane.ZY = Plane.YZ;
Plane.XZ = Plane.ZX;
var $V = Vector.create;
var $M = Matrix.create;
var $L = Line.create;
var $P = Plane.create;

 /* END OF FILE gamekit/matrix/GameKit_Matrix.js */ 

// at the end of all the beta testing of the engine, matrix2d is somehow slower than matrix3d despite my many attempts to optimize this class
// additionaly, on android, like matrix3d, matrix2d will still scramble shapes at some point and crash the browser if too many objects are shown
// making matrix2d virtually useless.
// IE9 has great matrix2d performance so I am leaving this in here for now.

/*************************************************************
 * This script is developed by Arturs Sosins aka ar2rsawseen, http://webcodingeasy.com
 * Feel free to distribute and modify code, but keep reference to its creator
 *
 * Tmatrix class generates transformation matrix from provided transformations. 
 * It can return matrix object, apply absolute or relative transformation to canvas context 
 * or return CSS matrix filter string for IE browsers.
 *
 * For more information, examples and online documentation visit: 
 * http://webcodingeasy.com/JS-classes/Calculate-transformation-matrix
**************************************************************/
var GameKit_Matrix2d = function(){
	var current = new Object();
	var degRat = (Math.PI/180);
	this.construct = function(){
		//create unit matrix
		current.m11 = 1;
		current.m12 = 0;
		current.m21 = 0;
		current.m22 = 1;
		current.dx = 0;
		current.dy = 0;
	};
	
	//rotate transformation
	this.rotate = function(deg){
		var rad = (deg2rad(deg));
		var m = matrix(Math.cos(rad), -Math.sin(rad), Math.sin(rad), Math.cos(rad), 0, 0);
		current = multiply(m, current);
	};
	
	//translate transformations
	this.translate = function(x, y){
		var m = matrix(1, 0, 0, 1, (x), (y));
		current = multiply(m, current);
	};
	
	this.translateX = function(x){
		this.translate(x,0);
	};
	
	this.translateY = function(y){
		this.translate(0,y);
	};
	
	//scaling transformations
	this.scale = function(x,y){
		var m = matrix((x), 0, 0, (y), 0, 0);
		current = multiply(m, current);
	};
	
	this.scaleX = function(x){
		this.scale(x,1);
	};
	
	this.scaleY = function(y){
		this.scale(1,y);
	};
	
	//skew transformations
	this.skew = function(xAng, yAng){
		var xAng = (deg2rad(xAng));
		var yAng = (deg2rad(yAng));
		var m = matrix(1, Math.tan(xAng), Math.tan(yAng), 1, 0, 0);
		current = multiply(m, current);
	};
	
	this.skewX = function(xAng){
		this.skew(xAng, 0);
	};
	
	this.skewY = function(yAng){
		this.skew(0, yAng);
	};
	
	//transformation matrix
	this.matrix = function(m11,m12,m21,m22,dx,dy){
		current = multiply(matrix(m11,m12,m21,m22,dx,dy), current);
	};
	
	//return matrix
	this.getMatrix = function(){
		return current;
	};
	
	//apply crossbrowser CSS transform to element
	this.CSStransform = function(el){
		el.style.MsTransform = "matrix(" + current.m11 + ", " + current.m21 + ", " + current.m12 + ", " + current.m22 + ", " + current.dx + ", " + current.dy + ")";
		el.style.MozTransform = "matrix(" + current.m11 + ", " + current.m21 + ", " + current.m12 + ", " + current.m22 + ", " + current.dx + "px, " + current.dy + "px)";
		el.style.WebkitTransform = "matrix(" + current.m11 + ", " + current.m21 + ", " + current.m12 + ", " + current.m22 + ", " + current.dx + ", " + current.dy + ")";
		el.style.OTransform = "matrix(" + current.m11 + ", " + current.m21 + ", " + current.m12 + ", " + current.m22 + ", " + current.dx + ", " + current.dy + ")";
		el.style.transform = "matrix(" + current.m11 + ", " + current.m21 + ", " + current.m12 + ", " + current.m22 + ", " + current.dx + ", " + current.dy + ")";
		el.style.filter = "progid:DXImageTransform.Microsoft.Matrix(M11='" + current.m11 + "', M12='" + current.m12 + "', M21='" + current.m21 + "', M22='" + current.m22 + "', Dx='" + current.dx + "', Dy='" + current.dy + "', sizingMethod='auto expand',);";
	};
	
	//return IE CSS matrix
	this.getIE = function(){
		return "progid:DXImageTransform.Microsoft.Matrix(M11='" + current.m11 + "', M12='" + current.m12 + "', M21='" + current.m21 + "', M22='" + current.m22 + "', Dx='" + current.dx + "', Dy='" + current.dy + "', sizingMethod='auto expand',);";
	};
	
	this.transformCanvas = function(ctx){
		ctx.transform(current.m11, current.m12, current.m21, current.m22, current.dx, current.dy);
	};
	
	this.setTransformCanvas = function(ctx){
		ctx.setTransform(current.m11, current.m12, current.m21, current.m22, current.dx, current.dy);
	};
	
	//reset current matrix to unit matrix
	this.reset = function(){
		current = matrix(1,0,0,1,0,0);
	};
	
	//create new matrix
	var matrix = function(m11, m12, m21, m22, dx, dy){
		var m = new Object();
		m.m11 = m11;
		m.m12 = m12;
		m.m21 = m21;
		m.m22 = m22;
		m.dx = dx;
		m.dy = dy;
		return m;
	};
	
	//multiply matrices
	var multiply = function(newMatrix, currentMatrix){
		//modify transformation matrix
		var m = new Object();
		m.m11 = newMatrix.m11*currentMatrix.m11 + newMatrix.m21*currentMatrix.m12;
		m.m12 = newMatrix.m12*currentMatrix.m11 + newMatrix.m22*currentMatrix.m12;
		m.m21 = newMatrix.m11*currentMatrix.m21 + newMatrix.m21*currentMatrix.m22;
		m.m22 = newMatrix.m12*currentMatrix.m21 + newMatrix.m22*currentMatrix.m22;
		m.dx = currentMatrix.dx + newMatrix.dx, 10
		m.dy = currentMatrix.dy + newMatrix.dy, 10
		//return new transformation matrix
		return m;
	};

	//convert degrees to radians
	var deg2rad = function(deg){
		return degRat*deg;
	};
	
	//format number
	var roundNumber = function(num, dec) {
		var result = Math.round(num*Math.pow(10,dec))/Math.pow(10,dec);
		return result;
	};

	this.construct();
}

 /* END OF FILE gamekit/matrix/GameKit_Matrix2d.js */ 

// absolutely no error checking currently, if you use this wrong it will break HARD
// needs to be placed inside a Playground to operate correctly
function DisplayObject()
{

	DisplayObject.prototype._setupDisplayObject = function()
	{
		this.mPosition = { x:0, y:0, z:0 };
		this.mLocalPosition = { x:0, y:0, z:0 };
		this.mRotation = 0;
		this.mScale = 1;
		this.mDiv;
		this.mParent;
		this.mElement;
		this.mChildren = new Array();
	}
	
	DisplayObject.prototype.initialize = function(aConstructorParams)
	{
		this.mConstructorParams = aConstructorParams;
		
	}
	
	DisplayObject.prototype.enter = function(){}
	DisplayObject.prototype.exit = function(){}
	DisplayObject.prototype.execute = function(){}
	
	/* DISPLAY */
	DisplayObject.prototype.getDiv = function(){ return this.mDiv; }
	DisplayObject.prototype.getElement = function(){ return this.mElement; }
	DisplayObject.prototype.getPlayground = function(){ return this.mPlayground; }
	
	DisplayObject.prototype.onAddedToStage = function(aPlayground)
	{
		this.mPlayground = aPlayground;
		this.mElement = this.mDiv[0];
		this.mCachedStyle = this.mElement.style;
	}
	/* DISPLAY */
	
	
	/* CONTAINER */
	DisplayObject.prototype.addChild = function( value )
	{
		if(value.getPlayground() == null){ this.mPlayground.addChild(value); }
		value.setParent(this);
		this.mChildren.push(value);
		this.mDiv.prepend(value.getDiv());
	}
	
	DisplayObject.prototype.removeChild = function( value )
	{
		value.getDiv().remove();
		value.getDiv().appendTo( this.mPlayground.getDiv() );
		this.mChildren.splice( this.mChildren.indexOf( value ), 1 );
	}
	
	DisplayObject.prototype.setParent = function( value )
	{
		this.mParent = value;
	}
	
	DisplayObject.prototype.getParent = function()
	{
		return this.mParent;
	}
	
	DisplayObject.prototype.getChildren = function()
	{
		return this.mChildren;
	}
	/* CONTAINER */
	
	/* TRANSFORM */
	/*
	 * setXPosition( aFloat )
	 */
	DisplayObject.prototype.setXPosition = function(value)
	{
		this.setPosition( {x : value, y : this.mPosition.y, z : this.mPosition.z} );
		DisplayObject.updateMatrix( this );
	}
	/*
	 * setYPosition( aFloat )
	 */
	DisplayObject.prototype.setYPosition = function(value)
	{
		this.setPosition( {x : this.mPosition.x, y : value, z : this.mPosition.z} );
		DisplayObject.updateMatrix( this );
	}
	/*
	 * setZPosition( aFLoat )
	 */
	DisplayObject.prototype.setZPosition = function(value)
	{
		this.setPosition( {x : this.mPosition.x, y : this.mPosition.y, z : value} );
		DisplayObject.updateMatrix( this );
	}
	/*
	 * getXPosition()
	 * returns aFloat
	 */
	DisplayObject.prototype.getXPosition = function(value)
	{
		return this.mPosition.x;
	}
	/*
	 * getYPosition()
	 * returns aFloat
	 */
	DisplayObject.prototype.getYPosition = function(value)
	{
		return this.mPosition.y;
	}
	/*
	 * getZPosition()
	 * returns aFloat
	 */
	DisplayObject.prototype.getZPosition = function(value)
	{
		return this.mPosition.z;
	}
	/*
	 * getWidth()
	 * returns aFloat
	 */
	DisplayObject.prototype.getWidth = function(value)
	{
		return this.mDiv.width();
	}
	/*
	 * getHeight()
	 * returns aFloat
	 */
	DisplayObject.prototype.getHeight = function(value)
	{
		return this.mDiv.height();
	}
	/*
	 * setPosition( {x:aFloat, y:aFloat, z:aFloat} )
	 */
	DisplayObject.prototype.setPosition = function(value)
	{
		this.mPosition = value;
		DisplayObject.updateMatrix( this );
	}
	/*
	 * getPosition()
	 * returns {x:aFloat, y:aFloat, z:aFloat}
	 */
	DisplayObject.prototype.getPosition = function(value)
	{
		return this.mPosition;
	}
	/*
	 * setAnchor( {x:aFloat y:aFloat} )
	 */
	DisplayObject.prototype.setAnchor = function(value)
	{
		this.mAnchor = value;
		this.mDiv.css({ transformOrigin:this.mAnchor.x+'px '+this.mAnchor.y+'px'});
		DisplayObject.updateMatrix( this );
	}
	/*
	 * returns {x:aFloat, y:aFloat}
	 */
	DisplayObject.prototype.getAnchor = function( value )
	{
		return this.mAnchor;
	}
	/*
	 * setRotation( aFloat 0 - 360 )
	 */
	DisplayObject.prototype.setRotation = function( value )
	{
		this.mRotation = value;
		DisplayObject.updateMatrix( this );
		//this.mDiv.css({ transform: 'rotate('+this.mRotation+'deg)' });
	}
	/*
	 * returns aFloat 0-360
	 */
	DisplayObject.prototype.getRotation = function( value )
	{
		return this.mRotation;
	}
	/*
	 * sets numeric scale, only 1 scale dimension is supported right now
	 */
	DisplayObject.prototype.setScale = function( value )
	{
		this.mScale = value;
		DisplayObject.updateMatrix( this );
	}
	/*
	 * returns numeric scale, only 1 scale dimension is supported right now
	 */
	DisplayObject.prototype.getScale = function( value )
	{
		return this.mScale;
	}
	/* TRANSFORM */
	
	/* ANIMATION */
	DisplayObject.prototype.animatePositionTo = function(value, duration, options)
	{
		options = options || {};
		options.x = value.x;
		options.y = value.y;
		options.z = value.z;
	    this.animate( this.mPosition, duration, options );
	}
	
	DisplayObject.prototype.animateRotationTo = function(value, duration, options)
	{
	    options = options || {};
		options.mRotation = value;
	    this.animate( this, duration, options );
	}
	
	
	DisplayObject.prototype.animateScaleTo = function(value, duration, options)
	{
	    options = options || {};
		options.mScale = value;
	    this.animate( this, duration, options );
	}

    DisplayObject.prototype.animateScaleFrom = function(value, duration, options)
    {
        options = options || {};
        options.mScale = value;
        this.animateFrom( this, duration, options );
    }

    DisplayObject.prototype.animatePositionFrom = function(value, duration, options)
    {
        options = options || {};
        options.x = value.x;
        options.y = value.y;
        options.z = value.z;
        this.animateFrom( this.mPosition, duration, options );
    }

    DisplayObject.prototype.animateFrom = function(value, duration, options)
    {
        var self = this;
        aDoProperty = value || self;
        options.onUpdate = DisplayObject.updateMatrix;
        options.onUpdateParams = [self];
        TweenMax.from( aDoProperty, duration, options );
    }

	DisplayObject.prototype.animate = function(value, duration, options)
	{
	    var self = this;
	    aDoProperty = value || self;
	    options.onUpdate = DisplayObject.updateMatrix;
	    options.onUpdateParams = [self];
	    TweenMax.to( aDoProperty, duration, options );
	}
	/* ANIMATION */
	
	/* HELPERS move into an additional class?*/
	/*
	 * containsPoint()
	 * returns bool if a point is in this bounding box area
	 */
	DisplayObject.prototype.containsPoint = function(value)
	{
		var aTopLeft = {x:this.mPosition.x, y:this.mPosition.y};
		var aBottomRight = {x:aTopLeft.x + this.getWidth(), y:aTopLeft.y + this.getHeight()};
		if(value.x < aBottomRight.x && value.x > aTopLeft.x)
		{
			if(value.y > aTopLeft.y && value.y < aBottomRight.y)
			{
				return true;	
			}	
		}
		return false;
	}
	/* HELPERS */
	
	/* INPUT */
	DisplayObject.prototype._onMouseOver = function(aButtonScope, aScope, aEvent)
	{
		this.onMouseOver( aButtonScope, aScope, aEvent );
	}
	
	DisplayObject.prototype._onMouseOut = function(aButtonScope, aScope, aEvent)
	{
		this.onMouseOut( aButtonScope, aScope, aEvent );
	}
	
	DisplayObject.prototype._onMouseDown = function(aButtonScope, aScope, aEvent)
	{
		this.onMouseDown( aButtonScope, aScope, aEvent );
	}
	
	DisplayObject.prototype._onMouseUp = function(aButtonScope, aScope, aEvent)
	{
		this.onMouseUp( aButtonScope, aScope, aEvent );
	}
	
	/* override the following functions to implement your own code! */
	DisplayObject.prototype.onMouseOver = function(aButtonScope, aScope, aEvent)
	{
		
	}
	
	DisplayObject.prototype.onMouseOut = function(aButtonScope, aScope, aEvent)
	{
		
	}
	
	DisplayObject.prototype.onMouseDown = function(aButtonScope, aScope, aEvent)
	{
		
	}
	
	DisplayObject.prototype.onMouseUp = function(aButtonScope, aScope, aEvent)
	{
		
	}
	/* INPUT */
	
}

function renderer_simple( aDo )
{
	var aDo = aDo;
	var rotationXMatrix, rotationYMatrix, rotationZMatrix, s, scaleMatrix, transformationMatrix, translationMatrix;
	deg2rad = Math.PI / 180;
	
	var rotateX = 0;
	var rotateY = 0;
	var rotateZ = aDo.getRotation();
	var scale = aDo.getScale();
	var aPosition = aDo.getPosition();
	 
	var xp = aPosition.x;
	var yp = aPosition.y; 
	s = "translate3d("+xp+"px, "+yp+"px, 0px) rotate("+rotateZ+"deg)  scale("+scale+", "+scale+")";
	
	// do not use jquery or something here, since its much slower
	aDo.mCachedStyle[DisplayObject.transformationProperty] = s;
	
	//aDo.getDiv().css("-moz-transform",s);
	// we need to update the childrens position kk thanks
	var aChildren = aDo.getChildren();
	for(var p = 0; p < aChildren.length; p++)
	{
		var aChild = aChildren[p];
		DisplayObject.updateMatrix( aChild );
	}
}

function renderer_matrix2d( aDo )
{

	 var rotateZ = Math.round(aDo.getRotation());
	 var scale = aDo.getScale();
	 var aPosition = aDo.getPosition();
	 var xp = (aPosition.x);
	 var yp = (aPosition.y);
	 
	 DisplayObject.matrix.construct();
	 DisplayObject.matrix.rotate(rotateZ);
	 DisplayObject.matrix.scale(scale,scale);
	 DisplayObject.matrix.translate(xp, yp);
	 
	var aMatrixCompiled = DisplayObject.matrix.getMatrix();
	var aMatrixString =  "matrix(" + aMatrixCompiled.m11 + ", " + aMatrixCompiled.m21 + ", " + aMatrixCompiled.m12 + ", " + aMatrixCompiled.m22 + ", " + aMatrixCompiled.dx + ", " + aMatrixCompiled.dy + ")";
	
	// generate that fatty fat style
	s = aMatrixString;
	
	// do not use jquery or something here, since its much slower
	aDo.mCachedStyle[DisplayObject.transformationProperty] = s;
	
	// we need to update the childrens position kk thanks
	var aChildren = aDo.getChildren();
	for(var p = 0; p < aChildren.length; p++)
	{
		var aChild = aChildren[p];
		DisplayObject.updateMatrix( aChild );
	}
};


function renderer_ie8( aDo )
{

	 var rotateZ = Math.round(aDo.getRotation());
	 var scale = aDo.getScale();
	 var aPosition = aDo.getPosition();
	 var xp = (aPosition.x);
	 var yp = (aPosition.y);
	 
	 aDo.mCachedStyle["left"] = xp+"px";
	 aDo.mCachedStyle["top"] = yp+"px";
	 
	 var aChildren = aDo.getChildren();
	for(var p = 0; p < aChildren.length; p++)
	{
		var aChild = aChildren[p];
		DisplayObject.updateMatrix( aChild );
	}
};

function renderer_matrix3d( aDo )
{
	 var aDo = aDo;
	 var rotationZMatrix, scaleMatrix, transformationMatrix, translationMatrix;

	 // local position was removed because now divs are nested when added as a child.
	 // var aPosition = aDo.mPosition + aDo.mLocalPosition;
	 var rotateX = 0;
	 var rotateY = 0;
	 var rotateZ = aDo.getRotation();
	 var scale = aDo.getScale();
	 var aPosition = aDo.getPosition();
	 var xp = aPosition.x;
	 var yp = aPosition.y;
	 
	//3d, it is slower since it calculates 3 matrices and then does the cross product thrice timz
	//rotationXMatrix = $M([[1, 0, 0, 0], [0, Math.cos(rotateX * deg2rad), Math.sin(-rotateX * deg2rad), 0], [0, Math.sin(rotateX * deg2rad), Math.cos(rotateX * deg2rad), 0], [0, 0, 0, 1]]);
	//rotationYMatrix = $M([[Math.cos(rotateY * deg2rad), 0, Math.sin(rotateY * deg2rad), 0], [0, 1, 0, 0], [Math.sin(-rotateY * deg2rad), 0, Math.cos(rotateY * deg2rad), 0], [0, 0, 0, 1]]);
	//rotationZMatrix = $M([[Math.cos(rotateZ * deg2rad), Math.sin(-rotateZ * deg2rad), 0, 0], [Math.sin(rotateZ * deg2rad), Math.cos(rotateZ * deg2rad), 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]]);
	
	//2d
	rotationZMatrix = $M( [[Math.cos(rotateZ * deg2rad), Math.sin(-rotateZ * deg2rad), 0, 0], [Math.sin(rotateZ * deg2rad), Math.cos(rotateZ * deg2rad), 0, 0], m_c, m_d ] );
	scaleMatrix = $M( [[scale, 0, 0, 0], [0, scale, 0, 0], [0, 0, scale, 0], m_d ] );
	translationMatrix = $M( [ m_a, m_b, m_c, [Math.sin(rotateX * deg2rad) * xp + xp, Math.sin(rotateY * deg2rad) * yp + yp, 0, 1]] );
	
	//3d, it is slower since it calculates 3 matrices and then does the cross product thrice timz
	//transformationMatrix = rotationXMatrix.x(rotationYMatrix).x(rotationZMatrix).x(scaleMatrix).x(translationMatrix);
	//2d
	transformationMatrix = (rotationZMatrix).x(scaleMatrix).x(translationMatrix);
	
	// generate that fatty fat style
	s = "matrix3d(";
	s += transformationMatrix.e(1, 1).toFixed(10) + "," + transformationMatrix.e(1, 2).toFixed(10) + "," + transformationMatrix.e(1, 3) + "," + transformationMatrix.e(1, 4).toFixed(10) + ",";
	s += transformationMatrix.e(2, 1).toFixed(10) + "," + transformationMatrix.e(2, 2).toFixed(10) + "," + transformationMatrix.e(2, 3) + "," + transformationMatrix.e(2, 4).toFixed(10) + ",";
	s += transformationMatrix.e(3, 1).toFixed(10) + "," + transformationMatrix.e(3, 2).toFixed(10) + "," + transformationMatrix.e(3, 3) + "," + transformationMatrix.e(3, 4).toFixed(10) + ",";
	s += transformationMatrix.e(4, 1).toFixed(10) + "," + transformationMatrix.e(4, 2).toFixed(10) + "," + transformationMatrix.e(4, 3) + "," + transformationMatrix.e(4, 4).toFixed(10);
	s += ")";
	
	// do not use jquery or something here, since its much slower
	aDo.mCachedStyle[DisplayObject.transformationProperty] = s;
	
	  //aDo.getDiv().css("-moz-transform",s);
	// we need to update the childrens position kk thanks
	var aChildren = aDo.getChildren();
	for(var p = 0; p < aChildren.length; p++)
	{
		var aChild = aChildren[p];
		DisplayObject.updateMatrix( aChild );
	}
};

DisplayObject.getSupportedProperty = function(proparray){
    var root=document.documentElement //reference root element of document
    for (var i=0; i<proparray.length; i++){ //loop through possible properties
        if (typeof root.style[proparray[i]]=="string"){ //if the property value is a string (versus undefined)
            return proparray[i] //return that string
        }
    }
};

DisplayObject.matrix = new GameKit_Matrix2d();
switch(Environment.E_PLATFORM){
	
	case E_Platform.INTERNETEXPORERLEGACY:
		DisplayObject.updateMatrix = renderer_ie8;
	break;
	
	case E_Platform.INTERNETEXPORER:
		DisplayObject.updateMatrix = renderer_simple;
	break;

    case E_Platform.CHROME_ANDROID:
    case E_Platform.CHROME:
    case E_Platform.SAFARI_IOS:
    case E_Platform.SAFARI:
		DisplayObject.updateMatrix = renderer_matrix3d;
	break;
	
	default:
		DisplayObject.updateMatrix = renderer_simple;
	break;	
}


var deg2rad = Math.PI / 180;
var m_a = [1, 0, 0, 0];
var m_b = [0, 1, 0, 0];
var m_c = [0, 0, 1, 0];
var m_d = [0, 0, 0, 1];

DisplayObject.transformationProperty  = DisplayObject.getSupportedProperty(['transform', 'MozTransform', 'WebkitTransform', 'msTransform', 'OTransform']);
DisplayObject.inheritsFrom( Touchable );


 /* END OF FILE gamekit/displayObject/DisplayObject.js */ 

/**
 * The display object animated class acts like a movie clip where the timeline is arrays of image sequences
 * You can add image sequences as an array of images loaded from the LoadingController
 * It creates a single canvas object and then paints the images in the sequence onto the canvas using canvas functionsz
 * one may think drawImage is not the right way to do this, which is true on paper, but copyPixels and everyother method has slower perfeormace
 */
function DisplayObject_Animated()
{
	
	/**
	 * setup the canvas object 
 	 * @param {Object} aConstructorParams must contain a width and height property for the canvas size which equals the image sequence size
	 */
	DisplayObject_Animated.prototype.initialize = function( aConstructorParams )
	{
		
		this.parent.initialize( aConstructorParams );
		
		this.mFrame = 0;
		this.mSpeed = aConstructorParams.speed || 1;
		this.mAnimations = {};
		this.mCanvas = null;
		this.mCurrentAnimation = null;
		this.mCurrentAnimationObject = {};
		this.mCurrentAnimationState = null;
		this.mCurrentAnimationLength = 1;
		this.mCanvasWidth = aConstructorParams.width;
		this.mCanvasHeight = aConstructorParams.height;
		this.mPaused = false;
		this.mCanvasOffsetX = 0;
		this.mCanvasOffsetY = 0;
		this.mCurrentLabel = "empty";
		this.mCanvasContext;
		this.mClearSprite;
		this.mLoop = true;
	}
	
	/**
	 * adds a sequence 
 	 * @param {Object} aName the id of the animation
 	 * @param {Object} aSequence a list of images png/jpeg 
	 */
	DisplayObject_Animated.prototype.addAnimation = function(aName, aSequence)
	{
		this.mAnimations[ aName ] = { frames:aSequence };
	}
	
	/**
	 * returns a div.  the div must contain a canvas object which has the id "displayObject_canvas"
	 * normally you will override this function
	 */
	DisplayObject_Animated.prototype.getDiv = function()
	{
		this.mDiv = $(HTMLGenerator_createTree( { style:"displayObject canvas", interior:'<canvas id="displayObject_canvas" width="' + this.mCanvasWidth + '" height="' + this.mCanvasHeight + '"></canvas>', } ));
		return this.mDiv
	}
	
	
	/**
	 * onAddedToStage sets the canvas context
 	 * @param {Object} aDiv
 	 * @param {Object} aPlayground
	 */
	DisplayObject_Animated.prototype.onAddedToStage = function( aPlayground )
	{
		this.mPlayground = aPlayground;
		this.mElement = this.mDiv[0];
		this.mCachedStyle = this.mElement.style;
		
		var aCanvas = this.mCanvasContext = this.mDiv.find("#displayObject_canvas")[0];
		this.mCanvasContext = aCanvas.getContext('2d');
	}
	
	/**
	 * paints the current frame from the current animation onto the canvas object  if this DO is added to a playground it will automatically have execute called 
 	 * @param {Object} aStep
	 */
	DisplayObject_Animated.prototype.execute = function( aStep )
	{
		this.draw();
		this.parent.execute(aStep);
	}
	
	DisplayObject_Animated.prototype.draw = function()
	{
		
		if( this.mPaused == false )
		{
			if(this.mLoop == true){
				this.mFrame += this.mSpeed;
				if( this.mFrame >= this.mCurrentAnimationLength ){ this.mFrame = 0 + (this.mFrame - this.mCurrentAnimationLength); this.dispatch(DisplayObject_Animated.EVENT_LOOP, this); }
			}else{
				if( this.mFrame >= (this.mCurrentAnimationLength - this.mSpeed) ){ this.mFrame = this.mCurrentAnimationLength - this.mSpeed;  }else{ this.mFrame += this.mSpeed; }
			}
		}
		
		if( this.mCurrentAnimation )
		{
			this.mCanvasContext.clearRect( 0, 0, this.mCanvasWidth, this.mCanvasHeight);
			this.mCanvasContext.drawImage( this.mCurrentAnimation[ Math.floor(this.mFrame) ], this.mCanvasOffsetX, this.mCanvasOffsetY, this.mCanvasWidth, this.mCanvasHeight );
		}
	}
	
	/**
	 * plays a animation  
 	 * @param {Object} aFrameLabel the animation 
 	 * @param {Object} aFrame the frame to start from defaults 0
	 */
	DisplayObject_Animated.prototype.playAnimation = function( aFrameLabel, aFrame )
	{
		this.mPaused = false;
		this.mFrame = aFrame || 0;
		this.mCurrentLabel = aFrameLabel;
		this.mCurrentAnimationObject = this.mAnimations[aFrameLabel];
		this.mCurrentAnimation = this.mCurrentAnimationObject.frames;
		this.mCurrentAnimationLength = this.mCurrentAnimationObject.frames.length;
	}
	
	/**
	 * unpauses the do and sets the current frame to aFrame
 	 * @param {Object} aFrame a frame to start defaults 0
	 */
	DisplayObject_Animated.prototype.play = function( aFrame )
	{		
		this.mPaused = false;
		aFrame = aFrame || 0;
		this.mFrame = aFrame;
	}
	
	/**
	 * pauses this do
	 */
	DisplayObject_Animated.prototype.stop = function()
	{
		this.mPaused = true;
	}
	
	/**
	 * resets the frame
	 */
	DisplayObject_Animated.prototype.rewind = function()
	{
		this.mFrame = 0;
	}
};

DisplayObject_Animated.EVENT_LOOP = "StateComplete";
DisplayObject_Animated.inheritsFrom( DisplayObject );

 /* END OF FILE gamekit/displayObject/DisplayObject_Animated.js */ 

/**
 * this is an experimental class and requires the box2djs to operate.
 * basically it just sets its position and rotation to the box2d bodyies position and rotation
 * need a way to get the center of the object, right now it assums all objects are 128 width and height
 */
function DisplayObject_Box2d()
{
	
	/**
	 * setup the canvas object 
 	 * @param {Object} aConstructorParams must contain a width and height property for the canvas size which equals the image sequence size
	 */
	DisplayObject_Box2d.prototype.initialize = function( aConstructorParams )
	{
		this.mBody = aConstructorParams.body;
		this.parent.initialize( aConstructorParams );
	}
	
	DisplayObject_Box2d.prototype.getBody = function(  )
	{
		return this.mBody;
	}
	
	DisplayObject_Box2d.prototype.execute = function( aStep )
	{
		var aPos = this.mBody.m_position;
		this.mPosition = {x:aPos.x-64, y:aPos.y-64}
		this.setRotation(-this.mBody.m_rotation*57.2957);
	}
	
};
DisplayObject_Box2d.inheritsFrom( DisplayObject );

 /* END OF FILE gamekit/displayObject/DisplayObject_Box2d.js */ 

function PDO_Animation()
{
	PDO_Animation.prototype.initialize = function(aContructorParams)
	{
		this.parent.initialize(aContructorParams);		
		this.mDiv = $( HTMLGenerator_createTree( { style:"displayObject pdoAnimation canvas "+this.mConstructorParams.sequence.style, interior:'<canvas id="displayObject_canvas" width="' +this.mConstructorParams.sequence.width + 'px" height="' + this.mConstructorParams.sequence.height + 'px"></canvas>', } ));
		
		var self = this;
		
		this.mSequence = aContructorParams.sequence;
		this.mSequenceName = aContructorParams.sequenceName;
		this.mLoop = this.mConstructorParams.loop || false;
		this.mAutoRemove = this.mConstructorParams.autoRemove || false;
		this.addAnimation( this.mSequenceName, this.mSequence );
		this.playAnimation( this.mSequenceName );
	}	
}

PDO_Animation.inheritsFrom( DisplayObject_Animated );


 /* END OF FILE gamekit/primitive/PDO_Animation.js */ 

function PDO_Button()
{
	
	PDO_Button.prototype.initialize = function(aContructorParams)
	{
		this.mConstructorParams = aContructorParams;
		this.mDiv = $(HTMLGenerator_createTree( { style:"displayObject pdoButton"}));
		
		var self = this;
		this.mButton = new ParallaxButton();
		this.mButton.initialize({ 
			id:"m_button", 
			container:this.mDiv, 
			upImage:this.mConstructorParams.upImage, 
			overImage:this.mConstructorParams.overImage, 
			downImage:this.mConstructorParams.downImage,
			lockedImage:this.mConstructorParams.lockedImage, 
			text:" ",
			click:function(aButtonScope, aScope, e){ aScope.mConstructorParams.onClick( aButtonScope.getData() ); },
			textStyle:this.mConstructorParams.textStyle,
			scope:this,
			data:this.mConstructorParams,
			buttonStyle:this.mConstructorParams.buttonStyle || ""
		});
	}	
}

PDO_Button.inheritsFrom( DisplayObject );

 /* END OF FILE gamekit/primitive/PDO_Button.js */ 

function PDO_Image()
{
	PDO_Image.prototype.initialize = function(aConstructorParams)
	{
		this.mConstructorParams = aConstructorParams;
		this.mDiv = $(HTMLGenerator_createTree( { style:"displayObject pdoImage "+(this.mConstructorParams.style || ""), interior:HTMLGenerator_getImage({ src:this.mConstructorParams.src }) } ));
	}
}

PDO_Image.inheritsFrom( DisplayObject );


 /* END OF FILE gamekit/primitive/PDO_Image.js */ 



 /* END OF FILE  */ 

